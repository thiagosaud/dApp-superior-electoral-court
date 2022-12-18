import { Container } from 'react-bootstrap';
import Logotype from 'components/Utils/Logotype';
import Loading from 'components/Utils/Loading';
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

export default function LoadingTemplate() {
	return (
		<Wrapper>
			<WrapperLogotype>
				<Logotype size='md' />
			</WrapperLogotype>

			<Loading />

			<div>
				<FooterbarGlobal />
			</div>
		</Wrapper>
	);
}
