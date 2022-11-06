import ImageSRC from 'assets/images/tse-logotype.png';
import styled from 'styled-components';

interface IProps {
	size: 'xs';
}

const Image = styled.img.attrs({
	src: ImageSRC,
	alt: 'Superior Electoral Court',
	loading: 'lazy',
})<IProps>`
	${({ size }) => size === 'xs' && { width: '35px', height: '35px' }}
`;

export default function Logotype({ size }: IProps) {
	return <Image size={size} />;
}
