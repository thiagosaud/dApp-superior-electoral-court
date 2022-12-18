import { memo } from 'react';
import Router from 'Router';
import { ToastContainer } from 'react-toastify';
import { createGlobalStyle } from 'styled-components';
import SolidityContractProvider from 'providers/useSolidityContractProvider';
import { useStorageDBProvider } from 'providers/useStorageDBProvider';

const GlobalStyle = createGlobalStyle`
	body {
		color: white;
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
			addElectoralResultInCache={addElectoralResultInCache}
			addWalletInCache={addWalletInCache}
			deleteWalletCached={deleteWalletCached}
		>
			<GlobalStyle />

			{isLoading ? <div style={{ position: 'absolute', backgroundColor: 'red', height: '100%', width: '100%' }}>ae</div> : <Router />}

			<ToastContainer theme='light' position='top-right' rtl={false} draggable pauseOnFocusLoss pauseOnHover closeOnClick />
		</SolidityContractProvider>
	);
}

export default memo(App);
