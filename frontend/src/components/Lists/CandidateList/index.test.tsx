import TestRenderer from 'react-test-renderer';
import { fireEvent, render, screen } from '@testing-library/react';
import MOCKED_DATA, { IData, IProps } from '__test__/mocks/CandidateListMock';
import CandidateList from 'components/Lists/CandidateList';

const handleOnClick = jest.fn();

describe('[CANDIDATE LIST] - Testing Component', () => {
	test('Should be have data!', () => {
		const { root } = TestRenderer.create(<CandidateList onConfirmVote={handleOnClick} data={MOCKED_DATA} hasVoted />);
		expect(root.props.data.length).toBeGreaterThanOrEqual(1);
	});

	test('Should be have childs component!', () => {
		render(<CandidateList onConfirmVote={handleOnClick} data={MOCKED_DATA} hasVoted />);

		const AVATAR = screen.getAllByRole('img');
		const CONFIRM_VOTE_BUTTON = screen.getAllByRole('button');
		const LIST_ITEM = screen.getAllByRole('listitem');
		const TITLE_NUMBER = screen.getAllByRole('heading');
		const TITLE_VOTES = screen.getAllByText('Votes:');
		const BADGE_VOTE_VALUE = screen.getAllByTestId('badge-vote-value-component');

		expect(AVATAR.length).toBeGreaterThanOrEqual(1);
		expect(CONFIRM_VOTE_BUTTON.length).toBeGreaterThanOrEqual(1);
		expect(LIST_ITEM.length).toBeGreaterThanOrEqual(1);
		expect(TITLE_NUMBER.length).toBeGreaterThanOrEqual(1);
		expect(TITLE_VOTES.length).toBeGreaterThanOrEqual(1);
		expect(BADGE_VOTE_VALUE.length).toBeGreaterThanOrEqual(1);
	});
});

describe('[CANDIDATE LIST] - Testing Component Data', () => {
	const { root } = TestRenderer.create(<CandidateList onConfirmVote={handleOnClick} data={MOCKED_DATA} hasVoted />);
	const PROPS = root.props as IProps;

	test('Should be have this properties values!', () => {
		MOCKED_DATA.forEach(({ votesConfirmed, number }, index) => {
			expect(PROPS.data[index].number).toStrictEqual(number);
			expect(PROPS.data[index].votesConfirmed).toStrictEqual(votesConfirmed);
		});
	});

	test.each(PROPS.data)('Should be have properties correct types!', ({ votesConfirmed, number }: IData) => {
		expect(typeof PROPS.hasVoted).toStrictEqual('boolean');
		expect(typeof PROPS.onConfirmVote).toStrictEqual('function');
		expect(typeof number).toStrictEqual('number');
		expect(typeof votesConfirmed).toStrictEqual('object');
		expect(typeof votesConfirmed.total).toStrictEqual('number');
		expect(typeof votesConfirmed.totalPercentage).toStrictEqual('number');
	});

	test.each(PROPS.data)(
		'Should be percentage value greater than or equal 0 and less than or equal to 100%',
		({ votesConfirmed }: Pick<IData, 'votesConfirmed'>) => {
			expect(votesConfirmed.totalPercentage).toBeGreaterThanOrEqual(0);
			expect(votesConfirmed.totalPercentage).toBeLessThanOrEqual(100);
		}
	);
});

describe('[CANDIDATE LIST] - Testing Component Confirm Vote Button', () => {
	test('Should be work on click to Confirm Vote!', () => {
		render(<CandidateList onConfirmVote={handleOnClick} data={MOCKED_DATA} hasVoted />);
		const BUTTON = screen.getAllByRole('button');

		BUTTON.forEach(button => {
			expect(fireEvent.click(button)).toBe(true);
		});
	});
});
