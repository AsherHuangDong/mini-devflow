import { http, HttpResponse } from 'msw';
import { URLS } from '../../api/urls';
import { getTasks, setTasks } from '../storage/task';
import { parseQueryString } from '../../tools';
import type { Task, TaskFilterRequest } from '../../interface/task';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const taskHandlers = [
	http.get(`${BASE_URL}${URLS.tasks.list}`, async ({ request }) => {
		const req: TaskFilterRequest = parseQueryString(request.url);
		const tasks = getTasks();
		const resultTasks = tasks.filter((task) => {
			let result = true;

			if (req?.title) {
				result = task.title.includes(req.title);
			}
			if (req?.completed !== undefined) {
				result = result && task.completed === req.completed;
			}
			if (req?.startCreatedAt) {
				result = result && task.createdAt >= req.startCreatedAt;
			}
			if (req?.endCreatedAt) {
				result = result && task.createdAt <= req.endCreatedAt;
			}
			return result;
		});

		return HttpResponse.json({
			code: 0,
			data: resultTasks,
			message: 'success',
		});
	}),
	http.post(`${BASE_URL}${URLS.tasks.add}`, async ({ request }) => {
		const body = await request.json();
		const { title } = body as { title: string };
		const task = {} as Task;
		task.id = `${Date.now()}`;
		task.title = title;
		task.completed = false;
		task.createdAt = Date.now();
		const tasks = getTasks();
		tasks.push(task);
		setTasks(tasks);
		return HttpResponse.json({ code: 0, message: 'success' });
	}),
	http.delete(`${BASE_URL}${URLS.tasks.delete(':id')}`, async ({ params }) => {
		const tasks = getTasks();
		const newTasks = tasks.filter((task) => task.id !== params.id);
		setTasks(newTasks);
		return HttpResponse.json({ code: 0, message: 'success' });
	}),
	http.put(`${BASE_URL}${URLS.tasks.edit(':id')}`, async ({ params, request }) => {
		const body = await request.json();
		const { id } = params;
		const { title, completed } = body as { title: string; completed?: boolean };
		const tasks = getTasks();
		const newTasks = tasks.map((task) =>
			task.id === id
				? {
						...task,
						title: title === undefined ? task.title : title,
						completed: completed === undefined ? task.completed : completed,
					}
				: task
		);
		setTasks(newTasks);
		return HttpResponse.json({ code: 0, message: 'success' });
	}),
];
