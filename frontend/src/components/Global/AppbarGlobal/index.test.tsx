import { render, screen } from '@testing-library/react';
import AppbarGlobal from '.';

describe('[APP BAR GLOBAL] - Testing Component', () => {
	test('Should be have childs component!', async () => {
		render(<AppbarGlobal />);

		const logotype = await screen.findByRole('img');
		const connectWallet = screen.getByText(/Connect Wallet/i);
		const title = screen.getByText(/dApp - Superior Electoral Court/i);

		expect(logotype).toBeInTheDocument();
		expect(connectWallet).toBeInTheDocument();
		expect(title).toBeInTheDocument();
	});
});
