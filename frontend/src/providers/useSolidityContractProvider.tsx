import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { ethers } from 'ethers';
import MetaMaskOnboarding from '@metamask/onboarding';
import BallotContract from 'contract/Ballot.json';
import { IContractGetResult } from 'contract/Interfaces';
import useStorageDB, { TypeInfuraData, TypeInfuraStorageData, TypeMetaMaskStorageData } from 'hooks/useStorageDB';

interface IContextData {
	states: {
		isLoadingDB: boolean;
		metamaskDB: TypeMetaMaskStorageData;
		infuraDB: TypeInfuraStorageData;
	};
	actions: {
		connect: () => Promise<TypeMetaMaskStorageData>;
		logout: () => Promise<void>;
		getElectoralResult: () => Promise<TypeInfuraStorageData>;
	};
}

const CONTEXT_DEFAULT_DATA: IContextData = {
	states: {
		isLoadingDB: true,
		metamaskDB: null,
		infuraDB: null,
	},
	actions: {
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		logout: async (): Promise<void> => {},
		connect: async (): Promise<TypeMetaMaskStorageData> => null,
		getElectoralResult: async (): Promise<TypeInfuraStorageData> => null,
	},
};

const CONTEXT = createContext<IContextData>(CONTEXT_DEFAULT_DATA);

export default function SolidityContractProvider({ children }: { children: ReactNode }) {
	const useStorageDBHook = useStorageDB();
	const [isLoadingDB, setIsLoadingDB] = useState(CONTEXT_DEFAULT_DATA.states.isLoadingDB);
	const [metamaskDB, setMetamaskDB] = useState<TypeMetaMaskStorageData>(CONTEXT_DEFAULT_DATA.states.metamaskDB);
	const [infuraDB, setInfuraDB] = useState<TypeInfuraStorageData>(CONTEXT_DEFAULT_DATA.states.infuraDB);

	const contract = useMemo(() => {
		const PROVIDER = ethers.providers.InfuraProvider.getWebSocketProvider({ chainId: 5, name: 'goerli' });
		const PRIVATE_WALLET = new ethers.Wallet(`${process.env.REACT_APP_WALLET_PRIVATE_KEY}`, PROVIDER);
		const CONTRACT = new ethers.Contract(process.env.REACT_APP_SOLIDITY_CONTRACT_ADDRESS || '', BallotContract.abi, PRIVATE_WALLET);

		return CONTRACT;
	}, []);

	const connect = useCallback(
		() =>
			new Promise<TypeMetaMaskStorageData>((resolve, reject) => {
				const TOAST_ID = 'eth_requestAccounts';

				if (!MetaMaskOnboarding.isMetaMaskInstalled()) {
					const METAMASK_ONBOARDING = new MetaMaskOnboarding();

					toast('You dont have the metamask installed, click here to be redirected!', {
						onClick: () => METAMASK_ONBOARDING.startOnboarding(),
						onClose: () => METAMASK_ONBOARDING.stopOnboarding(),
						toastId: TOAST_ID,
						type: 'info',
						closeButton: false,
					});

					reject(new Error('You dont have the metamask installed, click here to be redirected!'));
				}

				if (MetaMaskOnboarding.isMetaMaskInstalled() && window.ethereum) {
					toast
						.promise(
							window.ethereum.request({ method: 'eth_requestAccounts' }),
							{
								pending: 'Requesting Wallet Connection...',
								success: 'Success, Wallet Connected!',
								error: 'Oops, You canceled or have other connection with your wallet!',
							},
							{ toastId: TOAST_ID }
						)
						.then(accounts => {
							const ACCOUNT_LOGGED = (accounts as string[])[0];
							useStorageDBHook.updateMetaMaskStorageData(ACCOUNT_LOGGED);
							resolve(ACCOUNT_LOGGED || null);
						})
						.catch((error: DOMException) => reject(error));
				}
			}),
		[useStorageDBHook]
	);

	const logout = useCallback(
		(): Promise<void> =>
			new Promise((resolve, reject) => {
				const TOAST_ID = 'logout';

				try {
					useStorageDBHook.remove('@metamask');
					toast('Wallet disconnected successfully!', { toastId: TOAST_ID, type: 'success' });
					resolve();
				} catch (error) {
					toast('Oops... There was a problem disconnecting the wallet!', { toastId: TOAST_ID, type: 'error' });
					reject(error);
				}
			}),
		[useStorageDBHook]
	);

	const getElectoralResult = useCallback(async (): Promise<TypeInfuraData> => {
		try {
			const { candidates, totalConfirmedVotes, abstentionVotes, confirmedVotes }: IContractGetResult = await contract.getResult();

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

			useStorageDBHook.updateInfuraStorageData(CONVERTED_DATA);

			return CONVERTED_DATA;
		} catch (error) {
			const ERROR_MESSAGE = 'Oops... There was an error loading the candidates, please try again!';
			toast(ERROR_MESSAGE, { toastId: 'loading-candidates', type: 'error' });
			throw new Error(ERROR_MESSAGE);
		}
	}, [contract, useStorageDBHook]);

	const value: IContextData = useMemo(
		() => ({
			states: {
				isLoadingDB,
				metamaskDB,
				infuraDB,
			},
			actions: {
				connect,
				logout,
				getElectoralResult,
			},
		}),
		[isLoadingDB, metamaskDB, infuraDB, connect, logout, getElectoralResult]
	);

	useEffect(() => {
		useStorageDBHook
			.connect()
			.then(({ infuraData, metamaskData }) => {
				setInfuraDB(infuraData);
				setMetamaskDB(metamaskData);
			})
			.catch(() => {
				toast('Oops... There was a problem loading the database, please try again!', { toastId: 'loading-database', type: 'error' });
			})
			.finally(() => setIsLoadingDB(false));
	}, [useStorageDBHook]);

	return <CONTEXT.Provider value={value}>{children}</CONTEXT.Provider>;
}

export const useSolidityContractProvider = () => {
	const CONTEXT_HOOK = useContext(CONTEXT);

	if (!CONTEXT_HOOK) {
		throw new Error('useSolidityContractProvider must be used within an SolidityContractProvider.');
	}

	return CONTEXT_HOOK;
};
