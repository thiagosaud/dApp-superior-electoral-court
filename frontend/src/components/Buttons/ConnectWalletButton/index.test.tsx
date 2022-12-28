import { fireEvent, render, screen } from '@testing-library/react';
import ConnectWalletButton from 'components/Buttons/ConnectWalletButton';

const handleOnClick = jest.fn();

describe('[ConnectWalletButton] Generic Testing', () => {
	test('It should have the title "Connect Wallet"!', () => {
		render(<ConnectWalletButton onConnect={handleOnClick} isDisabled />);
		expect(screen.getByText(/Connect Wallet/i)).toBeInTheDocument();
	});
});

describe('[ConnectWalletButton] Testing OnClick Event', () => {
	test('Should be able to click with enabled button!', () => {
		render(<ConnectWalletButton onConnect={handleOnClick} isDisabled={false} />);
		const BUTTON = screen.getByText(/Connect Wallet/i);

		fireEvent.click(BUTTON);

		expect(BUTTON).toBeEnabled();
		expect(handleOnClick).toHaveBeenCalled();
		expect(handleOnClick).toHaveBeenCalledTimes(1);
	});

	test('Should not be able to click with disabled button!', () => {
		render(<ConnectWalletButton onConnect={handleOnClick} isDisabled />);
		const BUTTON = screen.getByText(/Connect Wallet/i);

		fireEvent.click(BUTTON);

		expect(BUTTON).toBeDisabled();
		expect(handleOnClick).not.toHaveBeenCalled();
		expect(handleOnClick).toHaveBeenCalledTimes(0);
	});
});
