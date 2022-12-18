import { Suspense, memo, useCallback } from 'react';
import { Badge, ListGroup } from 'react-bootstrap';
import { MathJsChain } from 'mathjs';
import GenericSkeleton from 'components/Skeletons/GenericSkeleton';
import { LazyVoteProgressTitleUtil, LazyVoteProgressBarUtil } from 'utils/LazyLoadingComponents';

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
	const VoteCount = useCallback(
		({ title, total, percentage }: { title: 'Confirmed' | 'Abstention'; total: number; percentage: MathJsChain<number> }) => (
			<div className='d-flex  gap-2'>
				<Badge bg={title === 'Confirmed' ? 'success' : 'secondary'}>{title}</Badge>

				{!isLoading && (
					<Suspense fallback={<GenericSkeleton height='20px' width={title === 'Confirmed' ? '66px' : '48px'} />}>
						<LazyVoteProgressTitleUtil total={total} percentage={percentage.done()} />
					</Suspense>
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

				<Suspense fallback={<GenericSkeleton height='16px' width='100%' />}>
					<LazyVoteProgressBarUtil
						votes={{
							confirmed: confirmed.totalPercentage.done(),
							abstention: abstention.totalPercentage.done(),
						}}
					/>
				</Suspense>
			</ListGroup.Item>
		</ListGroup>
	);
}

export default memo(VotingStatisticList);
