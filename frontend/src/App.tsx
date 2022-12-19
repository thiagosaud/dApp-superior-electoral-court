import { memo } from 'react';
import Router from 'Router';
import { ToastContainer } from 'react-toastify';
import { createGlobalStyle } from 'styled-components';
import LoadingTemplate from 'templates/LoadingTemplate';
import SolidityContractProvider from 'providers/useSolidityContractProvider';
import { useStorageDBProvider } from 'providers/useStorageDBProvider';

const GlobalStyle = createGlobalStyle`
	body {
		color: var(--bs-white);
		background-color: #596F99;
	}
`;

function App() {
	const {
		healthCheck: { isLoading },
		actions: { addElectoralResultInCache, addWalletInCache, deleteWalletCached },
	} = useStorageDBProvider();

	return (
		<SolidityContractProvider
			actions={{
				addElectoralResultInCache,
				addWalletInCache,
				deleteWalletCached,
			}}
		>
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
