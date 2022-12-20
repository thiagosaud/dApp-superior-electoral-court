import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import { IBallotContractGetResult, IBallotContractGetResultConverted } from 'contract/Interfaces';
import { useStorageDBProviderHook } from 'providers/useStorageDBProvider';
import { TypeInfuraData, TypeMetaMaskData } from 'hooks/useStorageDBHook';
import useEthersHook from 'hooks/useEthersHook';

interface IContextData {
	actions: {
		logout: () => Promise<void>;
		connect: () => Promise<void>;
		confirmVote: (candidateID: number) => Promise<void>;
		abstainVote: () => Promise<void>;
		getElectoralResult: () => Promise<TypeInfuraData>;
	};
}

const CONTEXT_DEFAULT_DATA: IContextData = {
	actions: {
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		logout: async (): Promise<void> => {},
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		connect: async (): Promise<void> => {},
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		confirmVote: async (): Promise<void> => {},
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		abstainVote: async (): Promise<void> => {},
		getElectoralResult: async (): Promise<TypeInfuraData> => ({
			candidates: [],
			totalConfirmedVotes: 0,
			confirmedVotes: [{ candidate: 0, electors: [], totalVotes: 0 }],
			abstentionVotes: { electors: [], totalVotes: 0 },
		}),
	},
};

const CONTEXT = createContext<IContextData>(CONTEXT_DEFAULT_DATA);

export default function SolidityContractProvider({ children }: { children: ReactNode }) {
	const useEthers = useEthersHook();
	const useStorageDBProvider = useStorageDBProviderHook();

	const connect = useCallback(
		() =>
			new Promise<void>((resolve, reject) => {
				if (useEthers.actions.hasMetaMaskInstalled()) {
					toast
						.promise(
							useEthers.actions.connect(),
							{
								pending: 'Waiting for connection to wallet...',
								success: 'Successfully connected!',
								error: 'Oops, You canceled or have other connection with your wallet!',
							},
							{ toastId: 'connect', pauseOnFocusLoss: false }
						)
						.then(({ wallet }) => {
							useStorageDBProvider.actions.addWalletInCache(wallet);
							resolve();
						})
						.catch((error: DOMException) => reject(error));
				}
			}),
		[useEthers, useStorageDBProvider]
	);

	const logout = useCallback(
		(): Promise<void> =>
			new Promise((resolve, reject) => {
				try {
					useStorageDBProvider.actions.deleteWalletCached();
					resolve();
				} catch (error) {
					toast('Oops... There was a problem disconnecting the wallet!', { toastId: 'logout', type: 'error' });
					reject(error);
				}
			}),
		[useStorageDBProvider]
	);

	const getElectoralResultConverted = useCallback(
		({
			candidates,
			totalConfirmedVotes,
			abstentionVotes,
			confirmedVotes,
		}: IBallotContractGetResult): IBallotContractGetResultConverted => ({
			totalConfirmedVotes: Number(totalConfirmedVotes._hex),
			candidates: candidates.map(({ _hex }) => Number(_hex)),
			confirmedVotes: confirmedVotes.map(({ candidate, electors, totalVotes }) => ({
				electors,
				candidate: Number(candidate._hex),
				totalVotes: Number(totalVotes._hex),
			})),
			abstentionVotes: {
				electors: abstentionVotes.electors,
				totalVotes: Number(abstentionVotes.totalVotes._hex),
			},
		}),
		[]
	);

	const getElectoralResult = useCallback(async (): Promise<TypeInfuraData> => {
		try {
			const DATA: IBallotContractGetResult = await useEthers.states.contract.infura.getResult();
			const DATA_CONVERTED = getElectoralResultConverted(DATA);

			useStorageDBProvider.actions.addElectoralResultInCache(DATA_CONVERTED);

			return DATA_CONVERTED;
		} catch (error) {
			toast('Oops... There was an error loading the candidates, please try again!', { toastId: 'get-electoral-result', type: 'error' });
			throw new Error();
		}
	}, [useEthers, useStorageDBProvider, getElectoralResultConverted]);

	const confirmVote = useCallback(
		async (candidateID: number) => {
			try {
				const CONTRACT_SIGNER = useEthers.states.contract.web3.connect(useEthers.states.provider.web3.getSigner());

				const ESTIMAGE_GAS = await toast.promise(
					CONTRACT_SIGNER.estimateGas.confirmVote(candidateID),
					{
						pending: 'Estimating the Gas...',
						success: 'Gas estimated successfully!',
						error: 'Oops... There was a problem estimating gas, or you already voted!',
					},
					{ toastId: 'confirm-vote-estimate-gas', pauseOnFocusLoss: false }
				);

				await toast.promise(
					useEthers.actions.sendTransaction(ESTIMAGE_GAS._hex, 'confirmVote', [candidateID]),
					{
						pending: 'Computing votes on the Blockchain...',
						success: 'Vote computed successfully!',
						error: 'Oops... There was a problem computing the vote!',
					},
					{ toastId: 'confirm-vote-send-transaction', pauseOnFocusLoss: false }
				);
			} catch (error) {
				throw new Error();
			}
		},
		[useEthers]
	);

	const abstainVote = useCallback(async () => {
		try {
			const CONTRACT_SIGNER = useEthers.states.contract.web3.connect(useEthers.states.provider.web3.getSigner());

			const ESTIMAGE_GAS = await toast.promise(
				CONTRACT_SIGNER.estimateGas.abstainVote(),
				{
					pending: 'Estimating the Gas...',
					success: 'Gas estimated successfully!',
					error: 'Oops... There was a problem estimating gas, or you already voted!',
				},
				{ toastId: 'confirm-vote-estimate-gas', pauseOnFocusLoss: false }
			);

			await toast.promise(
				useEthers.actions.sendTransaction(ESTIMAGE_GAS._hex, 'abstainVote', []),
				{
					pending: 'Computing votes on the Blockchain...',
					success: 'Vote computed successfully!',
					error: 'Oops... There was a problem computing the vote!',
				},
				{ toastId: 'confirm-vote-send-transaction', pauseOnFocusLoss: false }
			);
		} catch (error) {
			throw new Error();
		}
	}, [useEthers]);

	const value: IContextData = useMemo(
		() => ({
			actions: {
				connect,
				logout,
				confirmVote,
				abstainVote,
				getElectoralResult,
			},
		}),
		[connect, logout, confirmVote, abstainVote, getElectoralResult]
	);

	useEffect(() => {
		useEthers.states.provider.ethereum?.on(useEthers.events.changed.accounts, accounts =>
			useStorageDBProvider.actions.addWalletInCache((accounts as TypeMetaMaskData[])[0] as TypeMetaMaskData)
		);

		useEthers.states.provider.ethereum?.on(useEthers.events.changed.chain, chainID => {
			if (!useEthers.actions.isGoerliNetwork(chainID as string)) {
				toast('Attention, only use the GOERLI network!', { toastId: useEthers.events.changed.chain, type: 'warning' });
			}
		});

		useEthers.states.contract.web3.on('LogElectorVote', (_, electoralResult: IBallotContractGetResult) => {
			const DATA_CONVERTED = getElectoralResultConverted(electoralResult);
			useStorageDBProvider.actions.addElectoralResultInCache(DATA_CONVERTED);
		});

		return () => {
			useEthers.states.provider.ethereum?.removeAllListeners();
		};
	}, [useEthers, useStorageDBProvider, getElectoralResultConverted]);

	return <CONTEXT.Provider value={value}>{children}</CONTEXT.Provider>;
}

export const useSolidityContractProviderHook = () => {
	const CONTEXT_HOOK = useContext(CONTEXT);

	if (!CONTEXT_HOOK) {
		throw new Error('useSolidityContractProviderHook must be used within an SolidityContractProvider.');
	}

	return CONTEXT_HOOK;
};
