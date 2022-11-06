import { memo, useCallback, useMemo } from 'react';
import { Badge, ListGroup, ProgressBar } from 'react-bootstrap';
import useNumberConversion from 'hooks/useNumberConversion';

interface IProps {
	votes: {
		confirmed: {
			total: number;
			totalPercentage: number;
		};
		abstention: {
			total: number;
			totalPercentage: number;
		};
	};
}

function VotingStatisticList({ votes: { confirmed, abstention } }: IProps) {
	const { convertToCurrency, convertToPercentage } = useNumberConversion();

	const totalPercentageVotesConfirmed = useMemo(() => convertToPercentage(confirmed.totalPercentage), [confirmed, convertToPercentage]);
	const totalPercentageVotesAbstention = useMemo(() => convertToPercentage(abstention.totalPercentage), [abstention, convertToPercentage]);

	const getVoteText = useCallback(
		(total: number, percentage: number) => `${convertToCurrency(total)} (${convertToPercentage(percentage)})`,
		[convertToCurrency, convertToPercentage]
	);

	return (
		<ListGroup>
			<ListGroup.Item as='li' className='d-flex flex-column gap-2'>
				<h5 className='fw-bold mb-0'>Accurate Electorate</h5>

				<div className='d-flex flex-wrap gap-2 justify-content-between'>
					<div className='d-flex  gap-2'>
						<Badge bg='success'>Confirmed</Badge>
						<h6 className='fw-bold mb-0'>{getVoteText(confirmed.total, confirmed.totalPercentage)}</h6>
					</div>

					<div className='d-flex gap-2'>
						<Badge bg='secondary'>Abstention</Badge>
						<h6 className='fw-bold mb-0'>{getVoteText(abstention.total, abstention.totalPercentage)}</h6>
					</div>
				</div>

				<ProgressBar className='w-100' min={0} max={100}>
					<ProgressBar variant='success' key={1} now={confirmed.totalPercentage} label={totalPercentageVotesConfirmed} />
					<ProgressBar variant='secondary' key={2} now={abstention.totalPercentage} label={totalPercentageVotesAbstention} />
				</ProgressBar>
			</ListGroup.Item>
		</ListGroup>
	);
}

export default memo(VotingStatisticList);
