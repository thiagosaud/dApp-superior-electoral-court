import { memo } from 'react';
import Router from 'Router';
import { createGlobalStyle } from 'styled-components';
import { ToastContainer } from 'react-toastify';
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

			<ToastContainer theme='light' position='top-right' rtl={false} draggable pauseOnFocusLoss pauseOnHover closeOnClick />
		</SolidityContractProvider>
	);
}

export default memo(App);
