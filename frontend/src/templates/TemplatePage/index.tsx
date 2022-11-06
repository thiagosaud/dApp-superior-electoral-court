import { ReactNode } from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';

const CustomContainer = styled(Container).attrs({ fluid: false })`
	height: 100%;
	margin-top: 5rem;
`;

interface IProps {
	children: ReactNode;
}

export default function PageTemplate({ children }: IProps) {
	return <CustomContainer>{children}</CustomContainer>;
}
