import { getStorage, setStorage } from '../storage';
import type { Task, TaskFilterRequest } from '../interface/tasks';
import { URLS } from '../api/urls';
import { request } from '../request';

export const getTasks = async (taskFilterRequest?: TaskFilterRequest): Promise<Task[]> => {
	const req = {
		...taskFilterRequest,
		page: taskFilterRequest?.page || 1,
		pageSize: taskFilterRequest?.pageSize || 10,
	};
	await request({ url: URLS.tasks.list, method: 'GET', data: req });
	const tasksString = getStorage('tasks');
	const tasks: Task[] = tasksString ? JSON.parse(tasksString) : [];
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
	return resultTasks;
};

export const addTask = async (title: Task['title']): Promise<void> => {
	await request({ url: URLS.tasks.list, method: 'POST', data: { title } });
	const task = {} as Task;
	task.id = `${Date.now()}`;
	task.title = title;
	task.completed = false;
	task.createdAt = Date.now();
	const tasks = await getTasks();
	tasks.push(task);
	setStorage('tasks', JSON.stringify(tasks));
};

export const deleteTask = async (id: Task['id']): Promise<void> => {
	await request({ url: URLS.tasks.list, method: 'DELETE', params: { id } });
	const tasks = await getTasks();
	const newTasks = tasks.filter((task) => task.id !== id);
	setStorage('tasks', JSON.stringify(newTasks));
};

export const editTask = async (
	id: Task['id'],
	title?: Task['title'],
	completed?: Task['completed']
): Promise<void> => {
	await request({ url: URLS.tasks.list, method: 'POST', data: { id, title, completed } });
	const tasks = await getTasks();
	const newTasks = tasks.map((task) =>
		task.id === id
			? {
					...task,
					title: title === undefined ? task.title : title,
					completed: completed === undefined ? task.completed : completed,
				}
			: task
	);
	setStorage('tasks', JSON.stringify(newTasks));
};
