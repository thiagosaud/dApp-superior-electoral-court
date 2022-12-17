import { memo } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppbarGlobal from 'components/Globals/AppbarGlobal';
import FooterbarGlobal from 'components/Globals/FooterbarGlobal';
import HomePage from 'pages/HomePage';

function Router() {
	return (
		<BrowserRouter>
			<AppbarGlobal />

			<Routes>
				<Route path='/' element={<HomePage />} index />
				<Route path='*' element={<Navigate to='/' replace />} />
			</Routes>

			<FooterbarGlobal />
		</BrowserRouter>
	);
}

export default memo(Router);
