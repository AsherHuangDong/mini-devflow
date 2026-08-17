import { addTask, deleteTask, editTask, getTasks } from '../../api/tasks';
import type { Task, TaskFilterRequest } from '../../interface/tasks';

class TaskStore {
	private state = {
		tasks: [] as Task[],
		loading: false,
		error: '' as unknown,
	};

	private listeners = new Set<() => void>();

	getSnapshot() {
		return this.state;
	}

	setSnapshot(newState: {
		tasks?: Task[];
		loading?: boolean;
		error?: unknown;
		deletingIds?: Set<Task['id']>;
	}) {
		this.state = { ...this.state, ...newState };
		this.notify();
	}

	subscribe(listener: () => void) {
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
		this.setSnapshot({ loading: true });
		try {
			const tasks = await getTasks(taskFilterRequest);
			this.setSnapshot({ tasks });
		} catch (error) {
			this.setSnapshot({ error });
			throw error;
		} finally {
			this.setSnapshot({ loading: false });
		}
	}

	async fetchEditTask(id: Task['id'], title?: Task['title'], completed?: Task['completed']) {
		try {
			if (title === '') {
				alert('任务名称不能为空');
				return;
			}
			await editTask(id, title, completed);
			await this.fetchTasks();
		} catch (error) {
			this.setSnapshot({ error });
			throw error;
		}
	}

	async fetchDeleteTask(id: Task['id']): Promise<void> {
		try {
			await deleteTask(id);
			this.setSnapshot({ tasks: this.state.tasks.filter((t) => t.id !== id) });
		} catch (error) {
			this.setSnapshot({ error });
			throw error;
		}
	}

	async fetchAddTask(title: Task['title']) {
		this.setSnapshot({ loading: true });
		try {
			if (title === '') {
				alert('任务名称不能为空');
				return;
			}
			await addTask(title);
			await this.fetchTasks();
		} catch (error) {
			this.setSnapshot({ error });
			throw error;
		} finally {
			this.setSnapshot({ loading: false });
		}
	}
}

const taskStore = new TaskStore();

export default taskStore;
