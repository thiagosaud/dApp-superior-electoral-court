import { memo } from 'react';
import { Badge, Button, ListGroup } from 'react-bootstrap';
import { MathJsChain } from 'mathjs';
import Avatar from 'components/Utils/Avatar';

interface IProps {
	onConfirmVote: (number: number) => void;
	hasVoted: boolean;
	data: {
		number: number;
		votesConfirmed: {
			total: number;
			totalPercentage: MathJsChain<number>;
		};
	}[];
}

function CandidateList({ onConfirmVote, hasVoted, data }: IProps) {
	return (
		<ListGroup data-testid='candidate-list-component'>
			{data.map(({ number, votesConfirmed }) => (
				<ListGroup.Item key={`${number}`} as='li' className='d-flex flex-wrap gap-2 align-items-center'>
					<div className='d-flex justify-content-between align-items-center w-100'>
						<div className='d-flex flex-wrap align-items-center gap-2'>
							<Avatar
								alt={`Candidate #${number}`}
								src={`https://raw.githubusercontent.com/thiagosaud/dApp-superior-electoral-court/main/temp/imgs/candidate-${number}.png`}
							/>
							<h5 className='fw-bold mb-0'>#{number}</h5>
						</div>

						<div className='mt-1 d-flex flex-wrap align-items-center gap-2'>
							<span className='mb-1'>Votes:</span>

							<Badge bg='primary' pill style={{ width: '155px' }} data-testid='badge-vote-value-component'>
								{`${votesConfirmed.total} (${votesConfirmed.totalPercentage}%)`}
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
