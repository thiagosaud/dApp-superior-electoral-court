import { css, keyframes } from 'styled-components';

/**
 * @thiagosaud
 * @description This file creates the loading animation!
 */

/** @description This constant returns the CSSKeyFrames! */
const KEYFRAME = keyframes`
  	50% {
		left: 96px;
	}
`;

/** @description This function returns the animation already with the Keyframe applied! */
const ProgressAnimation = () => css`
	animation: ${KEYFRAME} 2s linear infinite;
`;

export default ProgressAnimation;
