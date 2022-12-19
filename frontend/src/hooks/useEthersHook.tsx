import { useCallback, useMemo } from 'react';
import { toast } from 'react-toastify';
import { ethers } from 'ethers';
import { MetaMaskInpageProvider } from '@metamask/providers';
import MetaMaskOnboarding from '@metamask/onboarding';
import BallotContract from 'contract/Ballot.json';

interface IConnectFunction {
	wallet: string;
}

interface IUseEthersHook {
	events: {
		changed: {
			accounts: 'accountsChanged';
			chain: 'chainChanged';
		};
	};
	states: {
		ethereum: MetaMaskInpageProvider | undefined;
		infura: {
			privateWallet: ethers.Wallet;
			contract: ethers.Contract;
		};
	};
	actions: {
		verifyMetaMaskExtension: () => boolean;
		connect: () => Promise<IConnectFunction>;
		isGoerliNetwork: (chainID: string) => boolean;
	};
}

export default function useEthersHook(): IUseEthersHook {
	const provider = useMemo(
		() => ({
			ethereum: window.ethereum,
			infura: ethers.providers.InfuraProvider.getWebSocketProvider({ chainId: 5, name: 'goerli' }),
		}),
		[]
	);

	const infura = useMemo(
		() => ({
			privateWallet: new ethers.Wallet(process.env.REACT_APP_WALLET_PRIVATE_KEY || '', provider.infura),
			contract: new ethers.Contract(
				process.env.REACT_APP_SOLIDITY_CONTRACT_ADDRESS || '',
				BallotContract.abi,
				new ethers.Wallet(process.env.REACT_APP_WALLET_PRIVATE_KEY || '', provider.infura)
			),
		}),
		[provider]
	);

	const isGoerliNetwork = useCallback((chainID: string) => chainID === '0x5', []);

	const verifyMetaMaskExtension = useCallback(() => {
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

	const connect = useCallback(
		() =>
			new Promise<{ wallet: string }>((resolve, reject) => {
				if (!provider.ethereum) {
					reject();
				}

				provider.ethereum
					?.request({ method: 'eth_requestAccounts' })
					.then(accounts => resolve({ wallet: (accounts as string[])[0] as string }))
					.catch(error => reject(error));
			}),
		[provider]
	);

	return {
		events: {
			changed: {
				accounts: 'accountsChanged',
				chain: 'chainChanged',
			},
		},
		states: {
			ethereum: provider.ethereum,
			infura,
		},
		actions: {
			verifyMetaMaskExtension,
			connect,
			isGoerliNetwork,
		},
	};
}
