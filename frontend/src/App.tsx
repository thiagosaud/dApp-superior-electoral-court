import { memo } from 'react';
import Router from 'Router';
import { createGlobalStyle } from 'styled-components';
import SolidityContractProvider from 'providers/useSolidityContractProvider';

const GlobalStyle = createGlobalStyle`
	body {
		color: white;
		background-color: #596F99;
	}
`;

function App() {
	return (
		<SolidityContractProvider>
			<GlobalStyle />
			<Router />
		</SolidityContractProvider>
	);
}

export default memo(App);
