import TestRenderer from 'react-test-renderer';
import { fireEvent, render, screen } from '@testing-library/react';
import MOCKED_DATA, { IData } from '__test__/mocks/CandidateListMock';
import CandidateList from '.';

describe('[CANDIDATE LIST] - Testing Component', () => {
	test('Should be have data!', () => {
		const { root } = TestRenderer.create(<CandidateList data={MOCKED_DATA} />);
		expect(root.props.data.length).toBeGreaterThanOrEqual(1);
	});

	test('Should be have childs component!', () => {
		render(<CandidateList data={MOCKED_DATA} />);

		const listItem = screen.getAllByRole('listitem');
		const avatar = screen.getAllByRole('img');
		const titleNumber = screen.getAllByRole('heading');
		const confirmVoteButton = screen.getAllByRole('button');
		const titleVotes = screen.getAllByText('Votes:');
		const badgeVoteValue = screen.getAllByTestId('badge-vote-value-component');

		expect(listItem.length).toBeGreaterThanOrEqual(1);
		expect(avatar.length).toBeGreaterThanOrEqual(1);
		expect(titleNumber.length).toBeGreaterThanOrEqual(1);
		expect(confirmVoteButton.length).toBeGreaterThanOrEqual(1);
		expect(titleVotes.length).toBeGreaterThanOrEqual(1);
		expect(badgeVoteValue.length).toBeGreaterThanOrEqual(1);
	});
});

describe('[CANDIDATE LIST] - Testing Component Data', () => {
	const { root } = TestRenderer.create(<CandidateList data={MOCKED_DATA} />);
	const dataProps: IData[] = root.props.data;

	test('Should be have this properties values!', () => {
		MOCKED_DATA.forEach(({ avatar, number }, index) => {
			expect(dataProps[index].avatar).toStrictEqual(avatar);
			expect(dataProps[index].number).toStrictEqual(number);
		});
	});

	test.each(dataProps)('Should be have properties correct types!', ({ onConfirmVote, number, avatar, hasVoted, votesConfirmed }: IData) => {
		expect(typeof onConfirmVote).toStrictEqual('function');
		expect(typeof number).toStrictEqual('number');
		expect(typeof avatar).toStrictEqual('string');
		expect(typeof hasVoted).toStrictEqual('boolean');
		expect(typeof votesConfirmed).toStrictEqual('object');
		expect(typeof votesConfirmed.total).toStrictEqual('number');
		expect(typeof votesConfirmed.totalPercentage).toStrictEqual('number');
	});

	test.each(dataProps)(
		'Should be percentage value greater than or equal 0 and less than or equal to 100%',
		({ votesConfirmed }: Pick<IData, 'votesConfirmed'>) => {
			expect(votesConfirmed.totalPercentage).toBeGreaterThanOrEqual(0);
			expect(votesConfirmed.totalPercentage).toBeLessThanOrEqual(100);
		}
	);
});

describe('[CANDIDATE LIST] - Testing Component Confirm Vote Button', () => {
	test('Should be work on click to Confirm Vote!', () => {
		render(<CandidateList data={MOCKED_DATA} />);

		screen.getAllByRole('button').forEach(button => {
			expect(fireEvent.click(button)).toBe(true);
		});
	});
});
