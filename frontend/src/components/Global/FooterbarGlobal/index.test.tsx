import { fireEvent, render, screen } from '@testing-library/react';
import FooterbarGlobal from './index';

describe('[FOOTER BAR GLOBAL] - Testing Component', () => {
	test('Should be have childs component!', () => {
		render(<FooterbarGlobal />);

		const hyperlink = screen.getByText(/Thiago Saud/i);
		const text = screen.getByText(/© All rights reserved by/i);

		expect(hyperlink).toBeInTheDocument();
		expect(text).toBeInTheDocument();
	});
});

describe('[FOOTER BAR GLOBAL] - Testing Github Button Component', () => {
	test('Should be have the Styles properties!', () => {
		render(<FooterbarGlobal />);
		expect(screen.getByText(/Thiago Saud/i)).toHaveStyle({
			color: 'white',
			'padding-left': '0.3rem',
		});
	});

	test('Should be have the Href property!', () => {
		render(<FooterbarGlobal />);
		expect(screen.getByText(/Thiago Saud/i)).toHaveProperty('href', 'https://github.com/thiagosaud/dApp-superior-electoral-court');
	});

	test('Should be work the click!', () => {
		render(<FooterbarGlobal />);
		expect(fireEvent.click(screen.getByText(/Thiago Saud/i))).toBe(true);
	});
});
