import { Button } from 'react-bootstrap';

interface IProps {
	onConnect: () => void;
	isDisabled: boolean;
}

/**
 * @thiagosaud
 * @description This component is unique for connecting wallet to wallet in MetaMask!
 * @interface IProps
 */
function ConnectWalletButton({ onConnect, isDisabled }: IProps) {
	return (
		<Button onClick={onConnect} variant='warning' disabled={isDisabled}>
			Connect Wallet
		</Button>
	);
}

export default ConnectWalletButton;
