import ImageSRC from 'assets/images/tse-logotype.png';
import styled from 'styled-components';

interface IProps {
	size: 'xs' | 'md';
}

const Image = styled.img.attrs({
	src: ImageSRC,
	alt: 'Superior Electoral Court',
	loading: 'eager',
})<IProps>`
	${({ size }) => size === 'xs' && { width: '35px', height: '35px' }}
	${({ size }) => size === 'md' && { width: '120px', height: '120px' }}
`;

export default function Logotype({ size }: IProps) {
	return <Image size={size} />;
}
