import { Button } from 'react-bootstrap';

interface IProps {
	onAbstainVote: () => void;
	isDisabled: boolean;
}

/**
 * @thiagosaud
 * @description This component is exclusive to Abstain the Vote!
 * @interface IProps
 */
function AbstainVoteButton({ onAbstainVote, isDisabled }: IProps) {
	return (
		<Button onClick={onAbstainVote} variant='light' disabled={isDisabled}>
			Abstain from Voting
		</Button>
	);
}

export default AbstainVoteButton;
