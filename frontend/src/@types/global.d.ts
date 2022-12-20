import { MetaMaskInpageProvider } from '@metamask/providers';
import { ExternalProvider } from '@ethersproject/providers';

declare global {
	interface Window {
		ethereum?: MetaMaskInpageProvider | ExternalProvider;
	}
}
