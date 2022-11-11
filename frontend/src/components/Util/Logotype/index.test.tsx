import TestRenderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import Logotype from './index';

describe('[LOGOTYPE UTIL] - Testing Component', () => {
	test('Should be have Size Property!', () => {
		const { root } = TestRenderer.create(<Logotype size='xs' />);
		const sizeProperty = root.props.size;

		expect(typeof sizeProperty).toBe('string');
		expect(sizeProperty).toStrictEqual('xs');
	});

	test('Should be have img child component!', () => {
		render(<Logotype size='xs' />);
		expect(screen.getByRole('img')).toBeInTheDocument();
	});
});

describe('[LOGOTYPE UTIL] - Testing Img Child Component', () => {
	test('Should be have styles properties!', () => {
		render(<Logotype size='xs' />);
		expect(screen.getByRole('img')).toHaveStyle({
			width: '35px',
			height: '35px',
		});
	});
});
