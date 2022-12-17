import { Button } from 'react-bootstrap';

interface IProps {
	height: string;
	width: string;
	isRounded?: boolean;
}

function GenericSkeleton({ height, width, isRounded }: IProps) {
	return <Button variant='warning' style={{ height, width, borderRadius: isRounded ? '100%' : 'auto' }} disabled />;
}

GenericSkeleton.defaultProps = {
	isRounded: false,
};

export default GenericSkeleton;
