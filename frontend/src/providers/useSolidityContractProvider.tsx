import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import { IContractGetResult } from 'contract/Interfaces';
import useEthersHook from 'hooks/useEthersHook';
import { TypeInfuraData, TypeMetaMaskData } from 'hooks/useStorageDBHook';
import { useStorageDBProviderHook } from './useStorageDBProvider';

interface IContextData {
	actions: {
		connect: () => Promise<void>;
		logout: () => Promise<void>;
		getElectoralResult: () => Promise<TypeInfuraData>;
	};
}

const CONTEXT_DEFAULT_DATA: IContextData = {
	actions: {
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		logout: async (): Promise<void> => {},
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		connect: async (): Promise<void> => {},
		getElectoralResult: async (): Promise<TypeInfuraData> => ({
			candidates: [],
			totalConfirmedVotes: 0,
			confirmedVotes: [{ candidate: 0, elector: [], vote: { total: 0 } }],
			abstentionVotes: { elector: [], vote: { total: 0 } },
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
				if (useEthers.actions.verifyMetaMaskExtension()) {
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
						.catch(() => reject());
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

	const getElectoralResult = useCallback(async (): Promise<TypeInfuraData> => {
		try {
			const { candidates, totalConfirmedVotes, abstentionVotes, confirmedVotes }: IContractGetResult =
				await useEthers.states.infura.contract.getResult();

			const CONVERTED_DATA: TypeInfuraData = {
				totalConfirmedVotes: Number(totalConfirmedVotes._hex),
				candidates: candidates.map(({ _hex }) => Number(_hex)),
				confirmedVotes: confirmedVotes.map(({ candidate, elector, vote }) => ({
					elector,
					candidate: Number(candidate._hex),
					vote: {
						total: Number(vote.total._hex),
					},
				})),
				abstentionVotes: {
					elector: abstentionVotes.elector,
					vote: {
						total: Number(abstentionVotes.vote.total._hex),
					},
				},
			};

			useStorageDBProvider.actions.addElectoralResultInCache(CONVERTED_DATA);

			return CONVERTED_DATA;
		} catch (error) {
			toast('Oops... There was an error loading the candidates, please try again!', { toastId: 'get-electoral-result', type: 'error' });
			throw new Error();
		}
	}, [useEthers, useStorageDBProvider]);

	const value: IContextData = useMemo(
		() => ({
			actions: {
				connect,
				logout,
				getElectoralResult,
			},
		}),
		[connect, logout, getElectoralResult]
	);

	useEffect(() => {
		useEthers.states.ethereum?.on(useEthers.events.changed.accounts, accounts =>
			useStorageDBProvider.actions.addWalletInCache((accounts as TypeMetaMaskData[])[0] as TypeMetaMaskData)
		);

		useEthers.states.ethereum?.on(useEthers.events.changed.chain, chainID => {
			if (!useEthers.actions.isGoerliNetwork(chainID as string)) {
				toast('Attention, only use the GOERLI network!', { toastId: useEthers.events.changed.chain, type: 'warning' });
			}
		});

		return () => {
			useEthers.states.ethereum?.removeAllListeners();
		};
	}, [useEthers, useStorageDBProvider]);

	return <CONTEXT.Provider value={value}>{children}</CONTEXT.Provider>;
}

export const useSolidityContractProvider = () => {
	const CONTEXT_HOOK = useContext(CONTEXT);

	if (!CONTEXT_HOOK) {
		throw new Error('useSolidityContractProvider must be used within an SolidityContractProvider.');
	}

	return CONTEXT_HOOK;
};
