import { memo, useCallback } from 'react';
import { Badge, Button, ListGroup } from 'react-bootstrap';
import AvatarUtil from 'components/Utils/AvatarUtil';
import VoteProgressTitleUtil from 'components/Utils/VoteProgressTitleUtil';

interface IProps {
	onConfirmVote: (number: number) => void;
	hasVoted: boolean;
	data: {
		number: number;
		votesConfirmed: {
			total: number;
			totalPercentage: number;
		};
	}[];
}

/**
 * @thiagosaud
 * @description This component is exclusive to control the list of candidates and voting actions and count views of the same!
 * @interface IProps
 */
function CandidateList({ onConfirmVote, hasVoted, data }: IProps) {
	const getCandidateID = useCallback((id: number) => id + 1, []);

	const getAvatarSRC = useCallback(
		(number: number) =>
			`https://raw.githubusercontent.com/thiagosaud/dApp-superior-electoral-court/main/temp/imgs/candidate-${getCandidateID(number)}.png`,
		[getCandidateID]
	);

	return (
		<ListGroup data-testid='candidate-list-component'>
			{data.map(({ number, votesConfirmed }) => (
				<ListGroup.Item key={`${number}`} as='li' className='d-flex flex-wrap gap-2 align-items-center'>
					<div className='d-flex justify-content-between align-items-center w-100'>
						<div className='d-flex flex-wrap align-items-center gap-2'>
							<AvatarUtil alt={`Candidate #${getCandidateID(number)}`} src={getAvatarSRC(number)} />
							<h5 className='fw-bold mb-0'>#{getCandidateID(number)}</h5>
						</div>

						<div className='mt-1 d-flex flex-wrap align-items-center gap-2'>
							<span className='mb-1'>Votes:</span>

							<Badge bg='primary' pill style={{ width: '155px' }} data-testid='badge-vote-value-component'>
								<VoteProgressTitleUtil total={votesConfirmed.total} percentage={votesConfirmed.totalPercentage} />
							</Badge>
						</div>
					</div>

					<Button className='w-100' variant='success' onClick={() => onConfirmVote(number)} disabled={hasVoted}>
						CONFIRM
					</Button>
				</ListGroup.Item>
			))}
		</ListGroup>
	);
}

export default memo(CandidateList);
