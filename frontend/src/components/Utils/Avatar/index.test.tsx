import TestRenderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import Avatar from '.';

describe('[AVATAR UTIL] - Testing Component', () => {
	test('Should be have properties!', () => {
		const { root } = TestRenderer.create(<Avatar src='Testing...' alt='Testing...' />);

		expect(typeof root.props.src).toBe('string');
		expect(typeof root.props.alt).toBe('string');
	});

	test('Should be have img child component!', () => {
		render(<Avatar src='Testing...' alt='Testing...' />);
		expect(screen.getByRole('img')).toBeInTheDocument();
	});
});

describe('[AVATAR UTIL] - Testing Img Child Component', () => {
	test('Should be have styles properties!', () => {
		render(<Avatar src='Testing...' alt='Testing...' />);
		expect(screen.getByRole('img')).toHaveStyle({
			width: '60px',
			height: '60px',
			border: '3px #fcc200 solid',
			'object-fit': 'cover',
			'border-radius': '100%',
		});
	});
});
