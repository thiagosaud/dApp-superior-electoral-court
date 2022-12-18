import { Suspense, lazy, useCallback, useEffect, useReducer, useState } from 'react';
import { Container, Navbar } from 'react-bootstrap';
import Logotype from 'components/Utils/Logotype';
import GenericSkeleton from 'components/Skeletons/GenericSkeleton';
import { useSolidityContractProvider } from 'providers/useSolidityContractProvider';
import { useStorageDBProvider } from 'providers/useStorageDBProvider';
import { TypeMetaMaskStorageData } from 'hooks/useStorageDB';

const LazyConnectWalletButton = lazy(() =>
	Promise.all([
		import(/* webpackChunkName: "ConnectedWalletButton" */ 'components/Buttons/ConnectWalletButton'),
		new Promise(resolve => {
			setTimeout(resolve, 1000);
		}),
	]).then(([moduleExports]) => moduleExports)
);

const LazyConnectedWalletButton = lazy(() =>
	Promise.all([
		import(/* webpackChunkName: "ConnectedWalletButton" */ 'components/Buttons/ConnectedWalletButton'),
		new Promise(resolve => {
			setTimeout(resolve, 1000);
		}),
	]).then(([moduleExports]) => moduleExports)
);

export default function AppbarGlobal() {
	const useSolidityContractProviderHook = useSolidityContractProvider();
	const useStorageDBProviderHook = useStorageDBProvider();
	const [isConnectingWallet, updateIsConnectingWallet] = useReducer(state => !state, false);
	const [isDisconnectingWallet, updateIsDisconnectingWallet] = useReducer(state => !state, false);
	const [walletConnected, setWalletConnected] = useState<TypeMetaMaskStorageData>(null);

	const handleOnConnectWallet = useCallback(() => {
		updateIsConnectingWallet();

		useSolidityContractProviderHook.actions
			.connect()
			.then(wallet => setWalletConnected(wallet))
			.finally(() => updateIsConnectingWallet());
	}, [useSolidityContractProviderHook]);

	const handleOnDisconnecWallet = useCallback(() => {
		updateIsDisconnectingWallet();

		useSolidityContractProviderHook.actions
			.logout()
			.then(() => setWalletConnected(null))
			.finally(() => updateIsDisconnectingWallet());
	}, [useSolidityContractProviderHook]);

	const cacheData = useCallback(() => {
		if (useStorageDBProviderHook.dataCached.metamask) {
			setWalletConnected(useStorageDBProviderHook.dataCached.metamask);
		}
	}, [useStorageDBProviderHook]);

	useEffect(() => cacheData(), [cacheData]);

	return (
		<Navbar expand='lg' fixed='top' bg='light' variant='light' collapseOnSelect>
			<Container>
				<Navbar.Brand className='d-flex gap-2 align-items-center'>
					<Logotype size='xs' />
					<Navbar.Collapse>dApp - Superior Electoral Court</Navbar.Collapse>
				</Navbar.Brand>

				<div className='justify-content-end'>
					<Suspense fallback={<GenericSkeleton height='38px' width='136px' />}>
						{!walletConnected ? (
							<LazyConnectWalletButton onConnect={handleOnConnectWallet} isDisabled={isConnectingWallet} />
						) : (
							<LazyConnectedWalletButton onLogout={handleOnDisconnecWallet} wallet={walletConnected} isDisabled={isDisconnectingWallet} />
						)}
					</Suspense>
				</div>
			</Container>
		</Navbar>
	);
}
