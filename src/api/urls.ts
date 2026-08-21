export const URLS = {
	tasks: {
		list: '/api/tasks',
		add: '/api/add/task',
		edit: (id: string) => `/api/edit/task/${id}`,
		delete: (id: string) => `/api/delete/task/${id}`,
	},
};
