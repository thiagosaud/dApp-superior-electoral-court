import styled from 'styled-components';
import SkeletonSRC from 'assets/images/skeleton.png';

const Image = styled.img.attrs({
	loading: 'lazy',
	className: 'd-inline-block align-top',
})`
	width: 60px;
	height: 60px;
	object-fit: cover;
	border: 3px #fcc200 solid;
	border-radius: 100%;
`;

interface IProps {
	src: string;
	alt: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
function Avatar({ src, alt }: IProps) {
	return <Image src={src || SkeletonSRC} alt={alt} />;
}

export default Avatar;
