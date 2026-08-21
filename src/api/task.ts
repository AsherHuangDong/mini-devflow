import type { Task, TaskFilterRequest } from '../interface/task';
import { URLS } from './urls';
import { request } from '../request';

export const getTasks = async (taskFilterRequest?: TaskFilterRequest): Promise<Task[]> => {
	const req = {
		...taskFilterRequest,
		page: taskFilterRequest?.page || 1,
		pageSize: taskFilterRequest?.pageSize || 10,
	};
	const tasks: Task[] = await request({ url: URLS.tasks.list, method: 'GET', params: req });
	return tasks;
};

export const addTask = async (title: Task['title']): Promise<void> => {
	await request({ url: URLS.tasks.add, method: 'POST', data: { title } });
};

export const deleteTask = async (id: Task['id']): Promise<void> => {
	await request({ url: URLS.tasks.delete(id), method: 'DELETE' });
};

export const editTask = async (
	id: Task['id'],
	title?: Task['title'],
	completed?: Task['completed']
): Promise<void> => {
	await request({ url: URLS.tasks.edit(id), method: 'PUT', data: { title, completed } });
};
