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
		<>
			<TaskFilter />
			<TaskForm />
			<TaskList taskList={tasks} />
		</>
	);
};

export default Tasks;
