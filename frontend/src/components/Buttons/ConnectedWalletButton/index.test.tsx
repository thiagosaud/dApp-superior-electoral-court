import { render, screen } from '@testing-library/react';
import ConnectedWalletButton from 'components/Buttons/ConnectedWalletButton';

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: jest.fn(),
}));

const handleOnClick = jest.fn();

describe('[CONNECTED WALLET BUTTON] Generic Testing', () => {
	test('It should have the Dropdown Button!', () => {
		render(<ConnectedWalletButton onLogout={handleOnClick} wallet='' isDisabled />);
		expect(screen.getByTestId(/dropdown-button/i)).toBeInTheDocument();
	});
});
