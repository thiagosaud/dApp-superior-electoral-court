import { useMemo } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';

interface IProps {
	wallet: string;
}

function ConnectedWalletButton({ wallet }: IProps) {
	const hash = useMemo(() => wallet?.substring(0, 11), [wallet]);

	return (
		<DropdownButton title={hash} variant='warning'>
			<Dropdown.Item as='button'>Logout</Dropdown.Item>
		</DropdownButton>
	);
}

export default ConnectedWalletButton;
