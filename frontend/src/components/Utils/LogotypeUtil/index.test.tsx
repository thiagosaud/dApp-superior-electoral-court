import TestRenderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import Logotype from 'components/Utils/LogotypeUtil';

describe('[LOGOTYPE UTIL] - Testing Component', () => {
	describe('[LOGOTYPE UTIL] - Testing Size Property Component', () => {
		test('Should be have XS Size Property!', () => {
			const { root } = TestRenderer.create(<Logotype size='xs' />);
			const sizeProperty = root.props.size;

			expect(typeof sizeProperty).toBe('string');
			expect(sizeProperty).toStrictEqual('xs');
		});

		test('Should be have MD Size Property!', () => {
			const { root } = TestRenderer.create(<Logotype size='md' />);
			const sizeProperty = root.props.size;

			expect(typeof sizeProperty).toBe('string');
			expect(sizeProperty).toStrictEqual('md');
		});
	});

	test('Should be have img child component!', () => {
		render(<Logotype size='xs' />);
		expect(screen.getByRole('img')).toBeInTheDocument();
	});
});

describe('[LOGOTYPE UTIL] - Testing Img Child Component', () => {
	describe('[LOGOTYPE UTIL] - Testing Sizes Style Properties Component', () => {
		test('Should be have XS styles properties!', () => {
			render(<Logotype size='xs' />);
			expect(screen.getByRole('img')).toHaveStyle({
				width: '35px',
				height: '35px',
			});
		});

		test('Should be have MD styles properties!', () => {
			render(<Logotype size='md' />);
			expect(screen.getByRole('img')).toHaveStyle({
				width: '120px',
				height: '120px',
			});
		});
	});
});
