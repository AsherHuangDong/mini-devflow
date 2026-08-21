import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

async function enableMocking() {
	if (import.meta.env.VITE_USE_MOCK !== 'true') {
		return;
	}

	const { worker } = await import('./mock/browser');
	// 务必 await 启动完成
	return worker.start({
		onUnhandledRequest: 'warn', // 未拦截的请求发出警告，方便排查
	});
}

enableMocking().then(() => {
	createRoot(document.getElementById('root')!).render(
		<StrictMode>
			<App />
		</StrictMode>
	);
});
