import { memo } from 'react';

interface IProps {
	total: number;
	percentage: number;
}

function VoteProgressTitleUtil({ total, percentage }: IProps) {
	return <h6 className='fw-bold mb-0'>{`${total} (${percentage}%)`}</h6>;
}

export default memo(VoteProgressTitleUtil);
