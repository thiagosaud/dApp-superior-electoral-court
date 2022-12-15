import { Button } from 'react-bootstrap';
import { ButtonVariant } from 'react-bootstrap/esm/types';

interface IProps {
	height: string;
	width: string;
	variant: ButtonVariant;
}

function ButtonSkeleton({ variant, height, width }: IProps) {
	return <Button variant={variant} style={{ height, width }} disabled />;
}

export default ButtonSkeleton;
