import { memo } from 'react';
import Router from 'Router';
import { ToastContainer } from 'react-toastify';
import { createGlobalStyle } from 'styled-components';
import LoadingTemplate from 'templates/LoadingTemplate';
import { useStorageDBProviderHook } from 'providers/useStorageDBProvider';
import SolidityContractProvider from 'providers/useSolidityContractProvider';

const GlobalStyle = createGlobalStyle`
	body {
		color: var(--bs-white);
		background-color: #596F99;
	}
`;

function App() {
	const {
		healthCheck: { isLoading },
	} = useStorageDBProviderHook();

	return (
		<SolidityContractProvider>
			<GlobalStyle />

			{isLoading ? <LoadingTemplate /> : <Router />}

			<ToastContainer
				theme='light'
				position='top-right'
				rtl={false}
				limit={5}
				newestOnTop
				draggable
				pauseOnFocusLoss
				pauseOnHover
				closeOnClick
			/>
		</SolidityContractProvider>
	);
}

export default memo(App);
