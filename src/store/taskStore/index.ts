import { addTask, deleteTask, editTask, getTasks } from '../../api/tasks';
import type { Task, TaskFilterRequest } from '../../interface/tasks';

class TaskStore {
	private state = {
		tasks: [] as Task[],
		loading: false,
		error: '' as unknown,
		deletingIds: new Set<Task['id']>(),
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
		await editTask(id, title, completed);
		await this.fetchTasks();
	}

	async fetchDeleteTask(id: Task['id']): Promise<void> {
		this.setSnapshot({ deletingIds: new Set([...this.state.deletingIds, id]) });
		try {
			await deleteTask(id);
			this.setSnapshot({ tasks: this.state.tasks.filter((t) => t.id !== id) });
		} catch (error) {
			this.setSnapshot({ error });
			throw error;
		} finally {
			this.setSnapshot({
				deletingIds: new Set([...this.state.deletingIds].filter((id) => id !== id)),
			});
		}
	}

	async fetchAddTask(title: Task['title']) {
		if (!title.trim()) {
			alert('任务名称不能为空');
			return;
		}
		await addTask(title);
		await this.fetchTasks();
	}
}

const taskStore = new TaskStore();

export default taskStore;
