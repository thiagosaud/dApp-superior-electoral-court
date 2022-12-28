/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { ethers } from 'ethers';
import { MetaMaskInpageProvider } from '@metamask/providers';
import MetaMaskOnboarding from '@metamask/onboarding';
import detectEthereumProvider from '@metamask/detect-provider';
import BallotContract from 'contract/Ballot.json';
import { TypeBallotContractFunctionFragment, TypeBallotContractFunctionFragmentParams } from 'contract/Interfaces';

interface IMetaMaskEthereumProvider {
	isMetaMask?: boolean;
	once(eventName: string | symbol, listener: (...args: any[]) => void): this;
	on(eventName: string | symbol, listener: (...args: any[]) => void): this;
	off(eventName: string | symbol, listener: (...args: any[]) => void): this;
	addListener(eventName: string | symbol, listener: (...args: any[]) => void): this;
	removeListener(eventName: string | symbol, listener: (...args: any[]) => void): this;
	removeAllListeners(event?: string | symbol): this;
}

interface IUseEthersHook {
	events: {
		changed: {
			accounts: 'accountsChanged';
			chain: 'chainChanged';
		};
	};
	states: {
		provider: {
			ethereum: MetaMaskInpageProvider | undefined;
			web3: ethers.providers.Web3Provider | undefined;
		};
		contract: {
			web3: ethers.Contract;
			infura: ethers.Contract;
		};
	};
	actions: {
		isGoerliNetwork: (chainID: string) => boolean;
		hasMetaMaskInstalled: () => boolean;
		loadingProvider: () => Promise<IMetaMaskEthereumProvider>;
		connect: () => Promise<{ wallet: string }>;
		sendTransaction: (
			estimateGas: string,
			functionFragment: TypeBallotContractFunctionFragment,
			functionFragmentParams?: TypeBallotContractFunctionFragmentParams
		) => Promise<ethers.providers.TransactionReceipt>;
	};
}

/**
 * @thiagosaud
 * @description This hook is exclusive to control the entire flow of MetaMask, Ethers and Infura Providers and contract handling in general!
 * @interface IUseEthersHook
 */
export default function useEthersHook(): IUseEthersHook {
	const [metamaskProvider, setMetamaskProvider] = useState<IMetaMaskEthereumProvider | null>(null);

	const provider = useMemo(
		() => ({
			ethereum: window.ethereum as MetaMaskInpageProvider,
			web3: metamaskProvider ? new ethers.providers.Web3Provider(metamaskProvider, { chainId: 5, name: 'goerli' }) : undefined,
			infura: ethers.providers.InfuraProvider.getWebSocketProvider({ chainId: 5, name: 'goerli' }),
		}),
		[metamaskProvider]
	);

	const contract = useMemo(
		() => ({
			web3: new ethers.Contract(process.env.REACT_APP_SOLIDITY_CONTRACT_ADDRESS || '', BallotContract.abi, provider.web3),
			infura: new ethers.Contract(
				process.env.REACT_APP_SOLIDITY_CONTRACT_ADDRESS || '',
				BallotContract.abi,
				new ethers.Wallet(process.env.REACT_APP_WALLET_PRIVATE_KEY || '', provider.infura)
			),
		}),
		[provider]
	);

	const isGoerliNetwork = useCallback((chainID: string) => chainID === '0x5', []);

	const hasMetaMaskInstalled = useCallback(() => {
		if (MetaMaskOnboarding.isMetaMaskInstalled()) {
			return true;
		}

		const METAMASK_ONBOARDING = new MetaMaskOnboarding();

		toast('You dont have the metamask installed, click here to be redirected!', {
			onClick: () => METAMASK_ONBOARDING.startOnboarding(),
			onClose: () => METAMASK_ONBOARDING.stopOnboarding(),
			toastId: 'verify-metamask-extension',
			type: 'info',
			closeButton: false,
		});

		return false;
	}, []);

	const loadingProvider = useCallback(
		async () =>
			new Promise<IMetaMaskEthereumProvider>((resolve, reject) => {
				detectEthereumProvider()
					.then(response => {
						setTimeout(() => {
							if (response) {
								resolve(response);
								setMetamaskProvider(response);
							} else {
								reject(new Error('Provider Metamask does not exist!'));
							}
						}, 2500);
					})
					.catch((error: DOMException) => reject(error));
			}),

		[]
	);

	const connect = useCallback(
		() =>
			new Promise<{ wallet: string }>((resolve, reject) => {
				if (!provider.ethereum) {
					reject(new Error('Ethereum Provider does not exist!'));
				}

				provider.ethereum
					?.request({ method: 'eth_requestAccounts' })
					.then(accounts => resolve({ wallet: (accounts as string[])[0] as string }))
					.catch(error => reject(error));
			}),
		[provider]
	);

	const sendTransaction = useCallback(
		(
			estimateGas: string,
			functionFragment: TypeBallotContractFunctionFragment,
			functionFragmentParams?: TypeBallotContractFunctionFragmentParams
		) =>
			new Promise<ethers.providers.TransactionReceipt>((resolve, reject) => {
				connect()
					.then(async ({ wallet }) => {
						try {
							const TRANSACTION = await provider.ethereum.request({
								method: 'eth_sendTransaction',
								params: [
									{
										from: wallet,
										to: process.env.REACT_APP_SOLIDITY_CONTRACT_ADDRESS,
										gas: estimateGas,
										value: 0,
										data: new ethers.utils.Interface(BallotContract.abi).encodeFunctionData(functionFragment, functionFragmentParams || []),
									},
								],
							});

							const TRANSACTION_RECEIPT = await provider.web3?.waitForTransaction(TRANSACTION as string);

							if (TRANSACTION_RECEIPT?.status === 0) {
								reject();
							}

							resolve(TRANSACTION_RECEIPT as ethers.providers.TransactionReceipt);
						} catch (error) {
							reject(error);
						}
					})
					.catch((error: DOMException) => reject(error));
			}),
		[provider, connect]
	);

	return {
		events: {
			changed: {
				accounts: 'accountsChanged',
				chain: 'chainChanged',
			},
		},
		states: { provider, contract },
		actions: {
			isGoerliNetwork,
			hasMetaMaskInstalled,
			loadingProvider,
			connect,
			sendTransaction,
		},
	};
}
