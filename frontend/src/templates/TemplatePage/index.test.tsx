import TestRenderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import TemplatePage from '.';

describe('[TEMPLATE PAGE] - Testing Component', () => {
	test('Should be have children!', () => {
		const { root } = TestRenderer.create(<TemplatePage>Testing...</TemplatePage>);
		expect(root.props).toHaveProperty('children');
	});
});

describe('[TEMPLATE PAGE] - Testing Component Styles', () => {
	test('Should be have Height and Margin-Top!', async () => {
		render(<TemplatePage>Testing...</TemplatePage>);
		expect(screen.getByTestId('custom-container-component')).toHaveStyle({
			height: '100%',
			'margin-top': '5rem',
		});
	});
});
