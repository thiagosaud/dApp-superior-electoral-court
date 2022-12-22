import { render, screen } from '@testing-library/react';
import LoadingTemplate from 'templates/LoadingTemplate';

describe('[LOADING TEMPLATE] - Testing Component', () => {
	test('Should be have childrens!', () => {
		render(<LoadingTemplate />);
		expect(screen.getAllByTestId(/wrapper/i)[0]).toBeInTheDocument();
		expect(screen.getAllByTestId(/wrapper-logotype/i)[0]).toBeInTheDocument();
		expect(screen.getByRole(/img/i)).toBeInTheDocument();
		expect(screen.getByText(/© All rights reserved by/i)).toBeInTheDocument();
	});
});

describe('[LOADING TEMPLATE] - Testing Component Styles', () => {
	test('Should be have Wrapper Styles!', async () => {
		render(<LoadingTemplate />);
		expect(screen.getAllByTestId('wrapper')[0]).toHaveStyle({
			position: 'absolute',
			display: 'flex',
			'flex-direction': 'column',
			'align-items': 'center',
			'justify-content': 'center',
			height: '100%',
		});
	});

	test('Should be have Wrapper Logotype Styles!', async () => {
		render(<LoadingTemplate />);
		expect(screen.getAllByTestId('wrapper-logotype')[0]).toHaveStyle({
			'margin-right': '30px',
		});
	});
});
