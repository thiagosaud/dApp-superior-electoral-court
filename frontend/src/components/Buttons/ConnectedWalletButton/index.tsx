import { useMemo } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';

interface IProps {
	onLogout: () => void;
	wallet: string;
	isDisabled: boolean;
}

function ConnectedWalletButton({ onLogout, wallet, isDisabled }: IProps) {
	const hash = useMemo(() => wallet.substring(0, 11), [wallet]);

	return (
		<DropdownButton variant='warning' align='end' title={hash} disabled={isDisabled}>
			<Dropdown.Item as='button' onClick={onLogout}>
				Logout
			</Dropdown.Item>
		</DropdownButton>
	);
}

export default ConnectedWalletButton;
