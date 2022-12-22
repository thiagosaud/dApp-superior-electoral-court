import { render, screen } from '@testing-library/react';
import AppbarGlobal from 'components/Globals/AppbarGlobal';

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: jest.fn(),
}));

describe('[APP BAR GLOBAL] - Testing Component', () => {
	test('Should be have childs component!', async () => {
		render(<AppbarGlobal />);

		const LOGOTYPE = await screen.findByRole('img');
		const CONNECT_WALLET_BUTTON = await screen.findByText(/Connect Wallet/i);
		const TITLE = screen.getByText(/dApp - Superior Electoral Court/i);

		expect(LOGOTYPE).toBeInTheDocument();
		expect(CONNECT_WALLET_BUTTON).toBeInTheDocument();
		expect(TITLE).toBeInTheDocument();
	});
});
