import styled from 'styled-components';
import ProgressAnimation from 'animations/ProgressAnimation';

const Wrapper = styled.div`
	position: relative;
	width: 130px;
	height: 2px;
	margin-top: 22px;
	overflow: hidden;
	background: var(--bs-gray-500);

	::before {
		${ProgressAnimation}
		position: absolute;
		left: -34px;
		width: 68px;
		height: 2px;
		content: '';
		background: var(--bs-warning);
	}
`;

function LoadingUtil() {
	return <Wrapper />;
}

export default LoadingUtil;
