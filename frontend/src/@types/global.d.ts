import { MetaMaskInpageProvider } from '@metamask/providers';
import { ExternalProvider } from '@ethersproject/providers';

/**
 * @thiagosaud
 * @description This module exports the ethereum provider!
 * @type {MetaMaskInpageProvider}: MetaMask Extension Provider
 * @type {ExternalProvider}: Web3 connection provider
 */
declare global {
	interface Window {
		ethereum?: MetaMaskInpageProvider | ExternalProvider;
	}
}
