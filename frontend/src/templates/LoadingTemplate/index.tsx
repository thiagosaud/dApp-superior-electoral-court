import { Container } from 'react-bootstrap';
import LogotypeUtil from 'components/Utils/LogotypeUtil';
import LoadingUtil from 'components/Utils/LoadingUtil';
import FooterbarGlobal from 'components/Globals/FooterbarGlobal';
import styled from 'styled-components';

const Wrapper = styled(Container).attrs({ fluid: true })`
	position: absolute;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100%;
`;

const WrapperLogotype = styled.div`
	margin-right: 30px;
`;

/**
 * @thiagosaud
 * @description This component is unique for controlling the Global Default Loading!
 */
export default function LoadingTemplate() {
	return (
		<Wrapper>
			<WrapperLogotype>
				<LogotypeUtil size='md' />
			</WrapperLogotype>

			<LoadingUtil />

			<div>
				<FooterbarGlobal />
			</div>
		</Wrapper>
	);
}
