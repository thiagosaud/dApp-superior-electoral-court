import { fireEvent, render, screen } from '@testing-library/react';
import AbstainVoteButton from 'components/Buttons/AbstainVoteButton';

const handleOnClick = jest.fn();

describe('[ABSTAIN VOTE BUTTON] Generic Testing', () => {
	test('It should have the title "Abstain from Voting"!', () => {
		render(<AbstainVoteButton onAbstainVote={handleOnClick} isDisabled />);
		expect(screen.getByText(/Abstain from Voting/i)).toBeInTheDocument();
	});
});

describe('[ABSTAIN VOTE BUTTON] Testing OnClick Event', () => {
	test('Should be able to click with enabled button!', () => {
		render(<AbstainVoteButton onAbstainVote={handleOnClick} isDisabled={false} />);
		const BUTTON = screen.getByText(/Abstain from Voting/i);

		fireEvent.click(BUTTON);

		expect(BUTTON).toBeEnabled();
		expect(handleOnClick).toHaveBeenCalled();
		expect(handleOnClick).toHaveBeenCalledTimes(1);
	});

	test('Should not be able to click with disabled button!', () => {
		render(<AbstainVoteButton onAbstainVote={handleOnClick} isDisabled />);
		const BUTTON = screen.getByText(/Abstain from Voting/i);

		fireEvent.click(BUTTON);

		expect(BUTTON).toBeDisabled();
		expect(handleOnClick).not.toHaveBeenCalled();
		expect(handleOnClick).toHaveBeenCalledTimes(0);
	});
});
