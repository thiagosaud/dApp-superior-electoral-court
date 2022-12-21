import { memo } from 'react';
import { ListGroup } from 'react-bootstrap';
import GenericSkeleton from 'components/Skeletons/GenericSkeleton';

/**
 * @thiagosaud
 * @description This component is exclusive to control the loading animation of the {CandidateList} component!
 */
function CandidateListSkeleton() {
	return (
		<ListGroup data-testid='candidate-list-component'>
			{['1', '2', '3', '4', '5', '6'].map(randomNumber => (
				<ListGroup.Item key={`${randomNumber}`} as='li' className='d-flex flex-wrap gap-2 align-items-center'>
					<div className='d-flex justify-content-between align-items-center w-100'>
						<div className='d-flex flex-wrap align-items-center gap-2'>
							<GenericSkeleton height='60px' width='60px' isRounded />
							<GenericSkeleton height='24px' width='25px' />
						</div>

						<div className='mt-1 d-flex flex-wrap align-items-center gap-2'>
							<span className='mb-1'>Votes:</span>
							<GenericSkeleton height='20px' width='155px' />
						</div>
					</div>

					<GenericSkeleton height='38px' width='100%' />
				</ListGroup.Item>
			))}
		</ListGroup>
	);
}

export default memo(CandidateListSkeleton);
