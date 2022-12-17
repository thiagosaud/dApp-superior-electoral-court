import { Button } from 'react-bootstrap';

interface IProps {
	height: string;
	width: string;
}

function GenericSkeleton({ height, width }: IProps) {
	return <Button variant='warning' style={{ height, width }} disabled />;
}

export default GenericSkeleton;
