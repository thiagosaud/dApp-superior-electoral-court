import { memo, useCallback } from 'react';
import { MathJsChain } from 'mathjs';
import { Badge, ListGroup, ProgressBar } from 'react-bootstrap';
import GenericSkeleton from 'components/Skeletons/GenericSkeleton';

interface IProps {
	isLoading: boolean;
	votes: {
		confirmed: {
			total: number;
			totalPercentage: MathJsChain<number>;
		};
		abstention: {
			total: number;
			totalPercentage: MathJsChain<number>;
		};
	};
}

function VotingStatisticList({ isLoading, votes: { confirmed, abstention } }: IProps) {
	const getProgressBarData = useCallback(
		(percentage: MathJsChain<number>) => ({
			now: Number(percentage),
			label: `${percentage}%`,
		}),
		[]
	);

	const VoteCount = useCallback(
		({ title, total, percentage }: { title: 'Confirmed' | 'Abstention'; total: number; percentage: MathJsChain<number> }) => (
			<div className='d-flex  gap-2'>
				<Badge bg={title === 'Confirmed' ? 'success' : 'secondary'}>{title}</Badge>

				{isLoading ? (
					<GenericSkeleton height='20px' width={title === 'Confirmed' ? '66px' : '48px'} />
				) : (
					<h6 className='fw-bold mb-0'>{`${total} (${percentage}%)`}</h6>
				)}
			</div>
		),
		[isLoading]
	);

	return (
		<ListGroup data-testid='voting-static-list-component'>
			<ListGroup.Item as='li' className='d-flex flex-column gap-2'>
				<h5 className='fw-bold mb-0'>Accurate Electorate</h5>

				<div className='d-flex flex-wrap gap-2 justify-content-between'>
					<VoteCount title='Confirmed' total={confirmed.total} percentage={confirmed.totalPercentage} />
					<VoteCount title='Abstention' total={abstention.total} percentage={abstention.totalPercentage} />
				</div>

				{isLoading ? (
					<GenericSkeleton height='16px' width='100%' />
				) : (
					<ProgressBar className='w-100' min={0} max={100}>
						<ProgressBar variant='success' key={1} {...getProgressBarData(confirmed.totalPercentage)} />
						<ProgressBar variant='secondary' key={2} {...getProgressBarData(abstention.totalPercentage)} />
					</ProgressBar>
				)}
			</ListGroup.Item>
		</ListGroup>
	);
}

export default memo(VotingStatisticList);
