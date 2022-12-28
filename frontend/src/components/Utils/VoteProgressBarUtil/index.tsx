import { memo, useCallback } from 'react';
import { ProgressBar } from 'react-bootstrap';

interface IProps {
	votes: {
		confirmed: number;
		abstention: number;
	};
}

/**
 * @thiagosaud
 * @description This component is exclusive to control the counted votes in progress bar!
 * @interface IProps
 */
function VoteProgressBarUtil({ votes: { confirmed, abstention } }: IProps) {
	const getLabel = useCallback((value: number) => `${value}%`, []);

	return (
		<ProgressBar className='w-100' min={0} max={100}>
			<ProgressBar variant='success' key={1} label={getLabel(confirmed)} now={confirmed} />
			<ProgressBar variant='secondary' key={2} label={getLabel(abstention)} now={abstention} />
		</ProgressBar>
	);
}

export default memo(VoteProgressBarUtil);
