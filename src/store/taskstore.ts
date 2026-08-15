import { addTask, deleteTask, editTask, getTasks } from '../api/tasks';
import type { Task, TaskFilterRequest } from '../interface/tasks';

class TaskStore {
	public tasks: Task[] = [];
	public loading: boolean = false;
	public error: unknown = '';

	async fetchTasks(taskFilterRequest?: TaskFilterRequest): Promise<void> {
		this.loading = true;
		try {
			const tasks = await getTasks(taskFilterRequest);
			this.tasks = tasks;
		} catch (error) {
			this.error = error;
			throw error;
		} finally {
			this.loading = false;
		}
	}

	async fetchEditTask(id: Task['id'], title?: Task['title'], completed?: Task['completed']) {
		await editTask(id, title, completed);
	}

	async fetchDeleteTask(id: Task['id']): Promise<void> {
		await deleteTask(id);
	}

	async fetchAddTask(title: Task['title']) {
		await addTask(title);
	}
}

const taskStore = new TaskStore();

export default taskStore;
