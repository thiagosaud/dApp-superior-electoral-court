import { Button } from 'react-bootstrap';

interface IProps {
	onConnect: () => void;
	isDisabled: boolean;
}

function ConnectWalletButton({ onConnect, isDisabled }: IProps) {
	return (
		<Button onClick={onConnect} variant='warning' disabled={isDisabled}>
			Connect Wallet
		</Button>
	);
}

export default ConnectWalletButton;
