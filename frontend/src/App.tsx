import { memo } from 'react';
import { createGlobalStyle } from 'styled-components';
import Router from 'Router';

const GlobalStyle = createGlobalStyle`
	body {
		color: white;
		background-color: #596F99;
	}
`;

function App() {
	return (
		<>
			<GlobalStyle />
			<Router />
		</>
	);
}

export default memo(App);
