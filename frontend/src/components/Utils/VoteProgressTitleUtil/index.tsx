import { memo } from 'react';

interface IProps {
	total: number | string;
	percentage: number | string;
}

/**
 * @thiagosaud
 * @description This component is exclusive to control the votes counted in text form!
 * @interface IProps
 */
function VoteProgressTitleUtil({ total, percentage }: IProps) {
	return <h6 className='fw-bold mb-0'>{`${total} (${percentage}%)`}</h6>;
}

export default memo(VoteProgressTitleUtil);
