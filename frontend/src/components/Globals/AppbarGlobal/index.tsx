import { useCallback, useEffect, useReducer, useState } from 'react';
import { Container, Navbar } from 'react-bootstrap';
import Logotype from 'components/Utils/Logotype';
import GenericSkeleton from 'components/Skeletons/GenericSkeleton';
import ConnectWalletButton from 'components/Buttons/ConnectWalletButton';
import ConnectedWalletButton from 'components/Buttons/ConnectedWalletButton';
import { useSolidityContractProvider } from 'providers/useSolidityContractProvider';
import { TypeMetaMaskStorageData } from 'hooks/useStorageDB';

export default function AppbarGlobal() {
	const { actions, states } = useSolidityContractProvider();
	const [isConnectingWallet, updateIsConnectingWallet] = useReducer(state => !state, false);
	const [isDisconnectingWallet, updateIsDisconnectingWallet] = useReducer(state => !state, false);
	const [wallet, setWallet] = useState<TypeMetaMaskStorageData>(null);

	const handleOnConnectWallet = useCallback(() => {
		updateIsConnectingWallet();

		actions
			.connect()
			.then(newWallet => setWallet(newWallet))
			.finally(() => updateIsConnectingWallet());
	}, [actions]);

	const handleOnDisconnecWallet = useCallback(() => {
		updateIsDisconnectingWallet();

		actions
			.logout()
			.then(() => setWallet(null))
			.finally(() => updateIsDisconnectingWallet());
	}, [actions]);

	const cacheData = useCallback(() => {
		if (!states.isLoadingDB) {
			updateIsConnectingWallet();
			setWallet(states.metamaskDB);
			updateIsConnectingWallet();
		}
	}, [states]);

	useEffect(() => cacheData(), [cacheData]);

	return (
		<Navbar expand='lg' fixed='top' bg='light' variant='light' collapseOnSelect>
			<Container>
				<Navbar.Brand className='d-flex gap-2 align-items-center'>
					<Logotype size='xs' />
					<Navbar.Collapse>dApp - Superior Electoral Court</Navbar.Collapse>
				</Navbar.Brand>

				<div className='justify-content-end'>
					{states.isLoadingDB && <GenericSkeleton height='38px' width='136px' />}

					{!states.isLoadingDB && !wallet && <ConnectWalletButton onConnect={handleOnConnectWallet} isDisabled={isConnectingWallet} />}

					{!states.isLoadingDB && !isConnectingWallet && wallet && (
						<ConnectedWalletButton onLogout={handleOnDisconnecWallet} wallet={wallet} isDisabled={isDisconnectingWallet} />
					)}
				</div>
			</Container>
		</Navbar>
	);
}
