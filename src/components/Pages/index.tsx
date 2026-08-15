import { PagesEnum, type PagesProps } from './interface';
import Dashboard from '../Dashboard';
import Tasks from '../Tasks';
import Notes from '../Notes';

const pages = {
	[PagesEnum.dashboard]: <Dashboard />,
	[PagesEnum.tasks]: <Tasks />,
	[PagesEnum.notes]: <Notes />,
};

const Pages = ({ pageName }: PagesProps) => {
	return pages[pageName];
};

export default Pages;
