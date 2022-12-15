import { lazy, Suspense } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import Logotype from 'components/Util/Logotype';
import ButtonSkeleton from 'components/Skeletons/ButtonSkeleton';
import { useSolidityContractProvider } from 'providers/useSolidityContractProvider';

const ConnectWalletButton = lazy(() =>
	Promise.all([
		import('components/Buttons/ConnectWalletButton'),
		new Promise(resolve => {
			setTimeout(resolve, 1000);
		}),
	]).then(([moduleExports]) => moduleExports)
);

const ConnectedWalletButton = lazy(() =>
	Promise.all([
		import('components/Buttons/ConnectedWalletButton'),
		new Promise(resolve => {
			setTimeout(resolve, 1000);
		}),
	]).then(([moduleExports]) => moduleExports)
);

export default function AppbarGlobal() {
	const {
		states: { isConnectingWallet, isLoggingOut, wallet },
		actions: { connect, logout },
	} = useSolidityContractProvider();

	return (
		<Navbar expand='lg' fixed='top' bg='light' variant='light' collapseOnSelect>
			<Container>
				<Navbar.Brand className='d-flex gap-2 align-items-center'>
					<Logotype size='xs' />
					<Navbar.Collapse>dApp - Superior Electoral Court</Navbar.Collapse>
				</Navbar.Brand>

				<Nav className='justify-content-end'>
					<Suspense fallback={<ButtonSkeleton variant='warning' height='38px' width='136px' />}>
						{!wallet ? (
							<ConnectWalletButton onConnected={connect} isDisabled={isConnectingWallet} />
						) : (
							<ConnectedWalletButton onLogout={logout} wallet={wallet} isDisabled={isLoggingOut} />
						)}
					</Suspense>
				</Nav>
			</Container>
		</Navbar>
	);
}
