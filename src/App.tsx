import { useState } from 'react';
import './App.css';
import Pages from './components/Pages';
import { PagesEnum, type PagesType } from './components/Pages/interface';

function App() {
	const [currentPage, setCurrentPage] = useState<PagesType>(PagesEnum.dashboard);
	return (
		<>
			<h1 className="title">Mini DevFlow</h1>
			{Object.values(PagesEnum).map((pageName) => {
				return (
					<button key={pageName} onClick={() => setCurrentPage(pageName)}>
						{pageName}
					</button>
				);
			})}
			<Pages pageName={PagesEnum[currentPage]} />
			<br />
			<div>欢迎来到 Mini DevFlow</div>
		</>
	);
}

export default App;
