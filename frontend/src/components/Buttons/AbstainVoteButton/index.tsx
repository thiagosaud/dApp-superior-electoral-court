import { Button } from 'react-bootstrap';

interface IProps {
	onAbstainVote: () => void;
	isDisabled: boolean;
}

function AbstainVoteButton({ onAbstainVote, isDisabled }: IProps) {
	return (
		<Button onClick={onAbstainVote} variant='light' disabled={isDisabled}>
			Abstain from Voting
		</Button>
	);
}

export default AbstainVoteButton;
