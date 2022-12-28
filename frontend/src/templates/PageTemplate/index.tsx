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

/**
 * @thiagosaud
 * @description This component is unique for controlling the Default Container of all pages!
 * @interface IProps
 */
export default function PageTemplate({ children }: IProps) {
	return <CustomContainer data-testid='custom-container-component'>{children}</CustomContainer>;
}
