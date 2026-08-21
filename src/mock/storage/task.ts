import type { Task } from '../../interface/task';
import { getStorage, setStorage } from '../../storage';

export const getTasks = (): Task[] => {
	const tasksString = getStorage('tasks');
	const tasks: Task[] = tasksString ? JSON.parse(tasksString) : [];
	return tasks;
};

export const setTasks = (tasks: Task[]): void => {
	setStorage('tasks', JSON.stringify(tasks));
};
