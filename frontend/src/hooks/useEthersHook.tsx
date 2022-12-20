import { useCallback, useMemo } from 'react';
import { toast } from 'react-toastify';
import { ethers } from 'ethers';
import { ExternalProvider } from '@ethersproject/providers';
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
		provider: {
			ethereum: MetaMaskInpageProvider | undefined;
			web3: ethers.providers.Web3Provider;
		};
		contract: {
			web3: ethers.Contract;
			infura: ethers.Contract;
		};
	};
	actions: {
		isGoerliNetwork: (chainID: string) => boolean;
		hasMetaMaskInstalled: () => boolean;
		connect: () => Promise<IConnectFunction>;
	};
}

export default function useEthersHook(): IUseEthersHook {
	const provider = useMemo(
		() => ({
			ethereum: window.ethereum as MetaMaskInpageProvider,
			web3: new ethers.providers.Web3Provider(window.ethereum as ExternalProvider),
			infura: ethers.providers.InfuraProvider.getWebSocketProvider({ chainId: 5, name: 'goerli' }),
		}),
		[]
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

	const connect = useCallback(
		() =>
			new Promise<IConnectFunction>((resolve, reject) => {
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
			connect,
		},
	};
}
