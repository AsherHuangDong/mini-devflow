import { useEffect } from 'react';
import type { Task, TaskFilterRequest } from '../../interface/tasks';
import taskStore from '../../store/taskstore';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import TaskFilter from './TaskFilter';

const Tasks = () => {
	const getTaskList = async (filter?: TaskFilterRequest): Promise<void> => {
		await taskStore.fetchTasks(filter);
	};

	const taggleAddTask = async (title: string): Promise<void> => {
		if (!title.trim()) {
			alert('任务名称不能为空');
			return;
		}
		await taskStore.fetchAddTask(title);
		getTaskList();
	};

	const onDeleteTask = async (task: Task): Promise<void> => {
		await taskStore.fetchDeleteTask(task.id);
		taskStore.tasks = taskStore.tasks.filter((t) => t.id !== task.id);
	};

	useEffect(() => {
		getTaskList();
	}, []);

	return (
		<div>
			<TaskFilter onFilterChange={getTaskList} />
			<TaskForm taggleAddTask={taggleAddTask} />
			<TaskList taskList={taskStore.tasks} onDeleteTask={onDeleteTask} />
		</div>
	);
};

export default Tasks;
