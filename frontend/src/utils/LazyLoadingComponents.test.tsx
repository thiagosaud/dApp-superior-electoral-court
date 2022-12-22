import { render } from '@testing-library/react';
import CANDIDATE_LIST_MOCKED_DATA from '__test__/mocks/CandidateListMock';
import VOTE_PROGRESS_BAR_UTIL_MOCKED_DATA from '__test__/mocks/VoteProgressBarUtilMock';
import VOTE_PROGRESS_TITLE_UTIL_MOCKED_DATA from '__test__/mocks/VoteProgressTitleUtilMock';
import {
	LazyAbstainVoteButton,
	LazyConnectWalletButton,
	LazyConnectedWalletButton,
	LazyCandidateList,
	LazyVoteProgressBarUtil,
	LazyVoteProgressTitleUtil,
} from 'utils/LazyLoadingComponents';

const handleOnClick = jest.fn();

describe('[LAZY LOADING COMPONENTS] Testing Components...', () => {
	test('Should have and work the Abstain Vote Button!', async () => {
		const { baseElement } = render(<LazyAbstainVoteButton onAbstainVote={handleOnClick} isDisabled />);
		expect(baseElement).toBeInTheDocument();
		expect(baseElement).toBeEnabled();
	});

	test('Should have and work the Connect Wallet Button!', () => {
		const { baseElement } = render(<LazyConnectWalletButton onConnect={handleOnClick} isDisabled />);
		expect(baseElement).toBeInTheDocument();
		expect(baseElement).toBeEnabled();
	});

	test('Should have and work the Connected Wallet Button!', () => {
		const { baseElement } = render(<LazyConnectedWalletButton onLogout={handleOnClick} wallet='' isDisabled />);
		expect(baseElement).toBeInTheDocument();
		expect(baseElement).toBeEnabled();
	});

	test('Should have and work the Candidate List!', () => {
		const { baseElement } = render(<LazyCandidateList onConfirmVote={handleOnClick} data={CANDIDATE_LIST_MOCKED_DATA} hasVoted />);
		expect(baseElement).toBeInTheDocument();
		expect(baseElement).toBeEnabled();
	});

	test('Should have and work the Vote Progress Bar Util!', () => {
		const { baseElement } = render(<LazyVoteProgressBarUtil votes={VOTE_PROGRESS_BAR_UTIL_MOCKED_DATA.votes} />);
		expect(baseElement).toBeInTheDocument();
		expect(baseElement).toBeEnabled();
	});

	test('Should have and work the Vote Progress Title Util!', () => {
		const { baseElement } = render(<LazyVoteProgressTitleUtil {...VOTE_PROGRESS_TITLE_UTIL_MOCKED_DATA} />);
		expect(baseElement).toBeInTheDocument();
		expect(baseElement).toBeEnabled();
	});
});
