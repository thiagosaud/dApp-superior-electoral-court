import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import StorageDBProvider from 'providers/useStorageDBProvider';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

const ROOT = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
ROOT.render(
	<StrictMode>
		<StorageDBProvider>
			<App />
		</StorageDBProvider>
	</StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
