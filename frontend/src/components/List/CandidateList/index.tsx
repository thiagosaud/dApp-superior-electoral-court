import { memo, useCallback } from 'react';
import { Badge, Button, ListGroup } from 'react-bootstrap';
import Avatar from 'components/Util/Avatar';
import useNumberConversion from 'hooks/useNumberConversion';

interface IProps {
	data: {
		onConfirmVote: (number: number) => void;
		number: number;
		avatar: string;
		hasVoted: boolean;
		votesConfirmed: {
			total: number;
			totalPercentage: number;
		};
	}[];
}

function CandidateList({ data }: IProps) {
	const { convertToCurrency, convertToPercentage } = useNumberConversion();

	const getVoteText = useCallback(
		(total: number, percentage: number) => `${convertToCurrency(total)} (${convertToPercentage(percentage)})`,
		[convertToCurrency, convertToPercentage]
	);

	return (
		<ListGroup data-testid='candidate-list-component'>
			{data.map(({ onConfirmVote, avatar, number, votesConfirmed, hasVoted }) => (
				<ListGroup.Item key={`${number}`} as='li' className='d-flex flex-wrap gap-2 align-items-center'>
					<div className='d-flex justify-content-between align-items-center w-100'>
						<div className='d-flex flex-wrap align-items-center gap-2'>
							<Avatar alt={`Candidate #${number}`} src={avatar} />
							<h5 className='fw-bold mb-0'>#{number}</h5>
						</div>

						<div className='mt-1 d-flex flex-wrap align-items-center gap-2'>
							<span className='mb-1'>Votes:</span>

							<Badge bg='primary' pill style={{ width: '155px' }} data-testid='badge-vote-value-component'>
								{getVoteText(votesConfirmed.total, votesConfirmed.totalPercentage)}
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
