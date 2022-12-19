import { Suspense, useCallback, useMemo, useReducer } from 'react';
import { Container, Navbar } from 'react-bootstrap';
import Logotype from 'components/Utils/Logotype';
import GenericSkeleton from 'components/Skeletons/GenericSkeleton';
import { LazyConnectWalletButton, LazyConnectedWalletButton } from 'utils/LazyLoadingComponents';
import { useStorageDBProviderHook } from 'providers/useStorageDBProvider';
import { useSolidityContractProvider } from 'providers/useSolidityContractProvider';

export default function AppbarGlobal() {
	const useSolidityContractProviderHook = useSolidityContractProvider();
	const useStorageDBProvider = useStorageDBProviderHook();
	const [isConnectingWallet, updateIsConnectingWallet] = useReducer((state: boolean) => !state, false);
	const [isDisconnectingWallet, updateIsDisconnectingWallet] = useReducer((state: boolean) => !state, false);

	const walletConnected = useMemo(() => useStorageDBProvider.dataCached.metamask, [useStorageDBProvider]);

	const handleOnConnectWallet = useCallback(() => {
		updateIsConnectingWallet();

		useSolidityContractProviderHook.actions.connect().finally(() => updateIsConnectingWallet());
	}, [useSolidityContractProviderHook]);

	const handleOnDisconnecWallet = useCallback(() => {
		updateIsDisconnectingWallet();

		useSolidityContractProviderHook.actions.logout().finally(() => updateIsDisconnectingWallet());
	}, [useSolidityContractProviderHook]);

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
