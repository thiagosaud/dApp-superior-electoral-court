import { useNavigate } from 'react-router-dom';

interface IUseRouteNavigationHook {
	goToHomePage: () => void;
	goToHelpPage: () => void;
	openContractPage: () => Window | null;
	openMyProfilePage: () => Window | null;
	openGithubPage: () => Window | null;
	openGoerliFaucetPage: () => Window | null;
}

export default function useRouteNavigationHook(): IUseRouteNavigationHook {
	const navigateHook = useNavigate();

	const windowOpen = (url: string) => window.open(url, '_blank', 'noopener,noreferrer');

	// ROUTES
	const goToHomePage = () => navigateHook('/home');
	const goToHelpPage = () => navigateHook('/help');

	// HYPERLINKS
	const openContractPage = () => windowOpen(`https://goerli.etherscan.io/address/${process.env.REACT_APP_SOLIDITY_CONTRACT_ADDRESS}`);
	const openMyProfilePage = () => windowOpen('https://www.linkedin.com/in/thiagosaud/');
	const openGithubPage = () => windowOpen('https://github.com/thiagosaud/dApp-superior-electoral-court');
	const openGoerliFaucetPage = () => windowOpen('https://goerlifaucet.com/');

	return {
		goToHomePage,
		goToHelpPage,
		openContractPage,
		openMyProfilePage,
		openGithubPage,
		openGoerliFaucetPage,
	};
}
