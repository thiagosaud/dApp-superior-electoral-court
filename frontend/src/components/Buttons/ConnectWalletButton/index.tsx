import { Button } from 'react-bootstrap';

interface IProps {
	onConnected: () => void;
	isDisabled: boolean;
}

function ConnectWalletButton({ onConnected, isDisabled }: IProps) {
	return (
		<Button onClick={onConnected} variant='warning' disabled={isDisabled}>
			{isDisabled ? 'Connecting...' : 'Connect Wallet'}
		</Button>
	);
}

export default ConnectWalletButton;
