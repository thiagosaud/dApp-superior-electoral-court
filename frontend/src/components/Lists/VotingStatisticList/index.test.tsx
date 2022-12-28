import TestRenderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import MOCKED_DATA, { IData } from '__test__/mocks/VotingStatisticListMock';
import VotingStatisticList from 'components/Lists/VotingStatisticList';

describe('[VOTING STATISTIC LIST] - Testing Component', () => {
	test('Should be have childs component!', () => {
		render(<VotingStatisticList isLoading votes={MOCKED_DATA} />);

		const LIST_ITEM = screen.getAllByRole('listitem');
		const ACCURATE_ELECTORATE_TITLE = screen.getByText(/Accurate Electorate/i);
		const CONFIRMED_TITLE = screen.getByText(/Confirmed/i);
		const ABSTENTION_TITLE = screen.getByText(/Abstention/i);

		expect(LIST_ITEM.length).toBeGreaterThanOrEqual(1);
		expect(ACCURATE_ELECTORATE_TITLE).toBeInTheDocument();
		expect(CONFIRMED_TITLE).toBeInTheDocument();
		expect(ABSTENTION_TITLE).toBeInTheDocument();
	});
});

describe('[VOTING STATISTIC LIST] - Testing Component Data', () => {
	const { root } = TestRenderer.create(<VotingStatisticList isLoading votes={MOCKED_DATA} />);
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
