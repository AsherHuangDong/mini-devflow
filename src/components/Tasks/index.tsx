import { useEffect, useSyncExternalStore } from 'react';
import taskStore from '../../store/taskstore';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import TaskFilter from './TaskFilter';

const Tasks = () => {
	const tasks = useSyncExternalStore(taskStore.subscribe, () => taskStore.state.tasks);

	useEffect(() => {
		taskStore.fetchTasks();
	}, []);

	return (
		<div>
			<TaskFilter onFilterChange={taskStore.fetchTasks} />
			<TaskForm taggleAddTask={taskStore.fetchAddTask} />
			<TaskList taskList={tasks} onDeleteTask={taskStore.fetchDeleteTask} />
		</div>
	);
};

export default Tasks;
