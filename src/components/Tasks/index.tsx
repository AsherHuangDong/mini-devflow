import { useEffect, useSyncExternalStore } from 'react';
import taskStore from '../../store/taskStore';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import TaskFilter from './TaskFilter';

const Tasks = () => {
	const tasks = useSyncExternalStore(
		(listener) => taskStore.subscribe(listener),
		() => taskStore.getSnapshot().tasks
	);

	useEffect(() => {
		taskStore.fetchTasks();
	}, []);

	return (
		<div>
			<TaskFilter onFilterChange={(filter) => taskStore.fetchTasks(filter)} />
			<TaskForm taggleAddTask={(title) => taskStore.fetchAddTask(title)} />
			<TaskList taskList={tasks} onDeleteTask={(id) => taskStore.fetchDeleteTask(id)} />
		</div>
	);
};

export default Tasks;
