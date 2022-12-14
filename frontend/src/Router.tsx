import { memo } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppbarGlobal from 'components/Globals/AppbarGlobal';
import FooterbarGlobal from 'components/Globals/FooterbarGlobal';
import HomePage from 'pages/HomePage';
import HelpPage from 'pages/HelpPage';

/**
 * @thiagosaud
 * @description This component is unique in that it controls all routing flow and global components!
 */
function Router() {
	return (
		<BrowserRouter>
			<AppbarGlobal />

			<Routes>
				<Route path='/' element={<HomePage />} index />
				<Route path='/help' element={<HelpPage />} />
				<Route path='*' element={<Navigate to='/' replace />} />
			</Routes>

			<FooterbarGlobal />
		</BrowserRouter>
	);
}

export default memo(Router);
