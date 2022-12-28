import { memo } from 'react';
import Router from 'Router';
import { ToastContainer } from 'react-toastify';
import { createGlobalStyle } from 'styled-components';
import LoadingTemplate from 'templates/LoadingTemplate';
import { useStorageDBProviderHook } from 'providers/useStorageDBProvider';
import SolidityContractProvider, { useSolidityContractProviderHook } from 'providers/useSolidityContractProvider';

const GlobalStyle = createGlobalStyle`
	body {
		color: var(--bs-white);
		background-color: #596F99;
	}
`;

/**
 * @thiagosaud
 * @description This component is unique in that it controls all main flow components and logic!
 */
function App() {
	const useStorageDBProvider = useStorageDBProviderHook();
	const useSolidityContractProvider = useSolidityContractProviderHook();

	return (
		<>
			<GlobalStyle />

			{useStorageDBProvider.healthCheck.isLoading && useSolidityContractProvider.states.healthCheck ? (
				<LoadingTemplate />
			) : (
				<SolidityContractProvider>
					<Router />
				</SolidityContractProvider>
			)}

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
		</>
	);
}

export default memo(App);
