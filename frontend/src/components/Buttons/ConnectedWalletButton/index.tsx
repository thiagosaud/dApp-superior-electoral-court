import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { RxExit } from 'react-icons/rx';

interface IProps {
	onLogout: () => void;
	wallet: string;
	isDisabled: boolean;
}

/**
 * @thiagosaud
 * @description This component is exclusive to execute actions from an already connected wallet!
 * @interface IProps
 */
function ConnectedWalletButton({ onLogout, wallet, isDisabled }: IProps) {
	const navigateHook = useNavigate();

	const hash = useMemo(() => wallet.substring(0, 11), [wallet]);

	const openContractPage = () =>
		window.open(`https://goerli.etherscan.io/address/${process.env.REACT_APP_SOLIDITY_CONTRACT_ADDRESS}`, '_blank', 'noopener,noreferrer');

	const goToHelpPage = () => navigateHook('/help');

	return (
		<DropdownButton variant='warning' align='end' title={hash} disabled={isDisabled}>
			<Dropdown.Item as='button' onClick={openContractPage}>
				Logs
			</Dropdown.Item>
			<Dropdown.Item as='button' onClick={goToHelpPage}>
				Help
			</Dropdown.Item>
			<Dropdown.Item as='button' onClick={onLogout} className='d-flex gap-2 align-items-center'>
				Logout
				<RxExit size='20' color='black' />
			</Dropdown.Item>
		</DropdownButton>
	);
}

export default ConnectedWalletButton;
