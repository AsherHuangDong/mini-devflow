import { addTask, deleteTask, editTask, getTasks } from '../api/tasks';
import type { Task, TaskFilterRequest } from '../interface/tasks';

class TaskStore {
	public tasks: Task[] = [];
	public loading: boolean = false;
	public error: unknown = '';
	private listeners = new Set<() => void>();

	subscribe(listener: () => void) {
		console.log('subscribe');
		this.listeners.add(listener);
		return () => {
			this.listeners.delete(listener);
		};
	}

	private notify() {
		this.listeners.forEach((listener) => {
			listener();
		});
	}

	async fetchTasks(taskFilterRequest?: TaskFilterRequest): Promise<void> {
		this.loading = true;
		this.notify();
		try {
			const tasks = await getTasks(taskFilterRequest);
			this.tasks = tasks;
			this.notify();
		} catch (error) {
			this.error = error;
			this.notify();
			throw error;
		} finally {
			this.loading = false;
			this.notify();
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
