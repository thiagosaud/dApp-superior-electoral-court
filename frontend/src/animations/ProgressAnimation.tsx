import { css, keyframes } from 'styled-components';

const KEYFRAME = keyframes`
  	50% {
		left: 96px;
	}
`;

const ProgressAnimation = () => css`
	animation: ${KEYFRAME} 2s linear infinite;
`;

export default ProgressAnimation;
