import TestRenderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import MOCKED_DATA, { IData } from '__test__/mocks/VotingStatisticListMock';
import VotingStatisticList from '.';

describe('[VOTING STATISTIC LIST] - Testing Component', () => {
	test('Should be have childs component!', () => {
		render(<VotingStatisticList votes={MOCKED_DATA} />);

		const listItem = screen.getAllByRole('listitem');
		const progressBar = screen.getAllByRole('progressbar');
		const accurateElectorateTitle = screen.getByText(/Accurate Electorate/i);
		const confirmedTitle = screen.getByText(/Confirmed/i);
		const abstentionTitle = screen.getByText(/Abstention/i);

		expect(listItem.length).toBeGreaterThanOrEqual(1);
		expect(progressBar.length).toBeGreaterThanOrEqual(1);
		expect(accurateElectorateTitle).toBeInTheDocument();
		expect(confirmedTitle).toBeInTheDocument();
		expect(abstentionTitle).toBeInTheDocument();
	});
});

describe('[VOTING STATISTIC LIST] - Testing Component Data', () => {
	const { root } = TestRenderer.create(<VotingStatisticList votes={MOCKED_DATA} />);
	const dataProps: IData = root.props.votes;

	test('Should be have this properties values!', () => {
		expect(dataProps.confirmed.total).toStrictEqual(MOCKED_DATA.confirmed.total);
		expect(dataProps.confirmed.totalPercentage).toStrictEqual(MOCKED_DATA.confirmed.totalPercentage);
		expect(dataProps.abstention.total).toStrictEqual(MOCKED_DATA.abstention.total);
		expect(dataProps.abstention.totalPercentage).toStrictEqual(MOCKED_DATA.abstention.totalPercentage);
	});

	test('Should be have properties correct types!', () => {
		expect(typeof dataProps.confirmed.total).toStrictEqual('number');
		expect(typeof dataProps.confirmed.totalPercentage).toStrictEqual('number');
		expect(typeof dataProps.abstention.total).toStrictEqual('number');
		expect(typeof dataProps.abstention.totalPercentage).toStrictEqual('number');
	});

	test('Should be percentage value greater than or equal 0 and less than or equal to 100%', () => {
		expect(dataProps.confirmed.totalPercentage).toBeGreaterThanOrEqual(0);
		expect(dataProps.confirmed.totalPercentage).toBeLessThanOrEqual(100);
		expect(dataProps.abstention.totalPercentage).toBeGreaterThanOrEqual(0);
		expect(dataProps.abstention.totalPercentage).toBeLessThanOrEqual(100);
	});
});

describe('[VOTING STATISTIC LIST] - Testing Component Progressbar', () => {
	test('Should be have aria-valuemin attribute equal 0% and aria-valuemax equal 100%!', () => {
		render(<VotingStatisticList votes={MOCKED_DATA} />);

		screen.getAllByRole('progressbar').forEach(bar => {
			expect(bar).toHaveAttribute('aria-valuemin', '0');
			expect(bar).toHaveAttribute('aria-valuemax', '100');
		});
	});

	test('Should be have aria-valuenow attribute greater than or equal 0% and less then or equal 100%!', () => {
		render(<VotingStatisticList votes={MOCKED_DATA} />);

		screen.getAllByRole('progressbar').forEach(bar => {
			const ariaValueNow = bar.getAttribute('aria-valuenow');
			const convertedAriaValueNow = parseFloat(ariaValueNow || '-1');

			expect(ariaValueNow).toBeTruthy();
			expect(convertedAriaValueNow).toBeGreaterThanOrEqual(0);
			expect(convertedAriaValueNow).toBeLessThan(100);
		});
	});
});
