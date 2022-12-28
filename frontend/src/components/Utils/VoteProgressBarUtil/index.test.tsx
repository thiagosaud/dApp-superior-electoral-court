import TestRenderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import MOCKED_DATA, { IProps } from '__test__/mocks/VoteProgressBarUtilMock';
import VoteProgressBarUtil from 'components/Utils/VoteProgressBarUtil';

describe('[VOTE PROGRESS BAR UTIL] - Testing Component', () => {
	test('Should be have childs component!', () => {
		render(<VoteProgressBarUtil votes={MOCKED_DATA.votes} />);
		const CONFIRMED_VOTES = screen.getByText(/99.99%/i);
		const ABSTAINED_VOTES = screen.getByText(/89.85%/i);

		expect(CONFIRMED_VOTES).toBeInTheDocument();
		expect(ABSTAINED_VOTES).toBeInTheDocument();
	});
});

describe('[VOTE PROGRESS BAR UTIL] - Testing Component Data', () => {
	const { root } = TestRenderer.create(<VoteProgressBarUtil votes={MOCKED_DATA.votes} />);
	const PROPS = root.props as IProps;

	test('Should be have this properties values!', () => {
		expect(PROPS.votes.abstention).toStrictEqual(MOCKED_DATA.votes.abstention);
		expect(PROPS.votes.confirmed).toStrictEqual(MOCKED_DATA.votes.confirmed);
	});

	test('Should be have properties correct types!', () => {
		expect(typeof PROPS.votes).toStrictEqual('object');
		expect(typeof PROPS.votes.abstention).toStrictEqual('number');
		expect(typeof PROPS.votes.confirmed).toStrictEqual('number');
	});

	test('Should be percentage value greater equal 99.99% and 89.85%!', () => {
		expect(PROPS.votes.confirmed).toBeLessThanOrEqual(99.99);
		expect(PROPS.votes.abstention).toBeGreaterThanOrEqual(89.85);
	});
});

describe('[VOTE PROGRESS BAR UTIL] - Testing Component Progressbar', () => {
	test('Should be have aria-valuemin attribute equal 0% and aria-valuemax equal 100%!', () => {
		render(<VoteProgressBarUtil votes={MOCKED_DATA.votes} />);

		screen.getAllByRole('progressbar').forEach(bar => {
			expect(bar).toHaveAttribute('aria-valuemin', '0');
			expect(bar).toHaveAttribute('aria-valuemax', '100');
		});
	});

	test('Should be have aria-valuenow attribute greater than or equal 0% and less then or equal 100%!', () => {
		render(<VoteProgressBarUtil votes={MOCKED_DATA.votes} />);

		screen.getAllByRole('progressbar').forEach(bar => {
			const ariaValueNow = bar.getAttribute('aria-valuenow');
			const convertedAriaValueNow = parseFloat(ariaValueNow || '-1');

			expect(ariaValueNow).toBeTruthy();
			expect(convertedAriaValueNow).toBeGreaterThanOrEqual(0);
			expect(convertedAriaValueNow).toBeLessThan(100);
		});
	});
});
