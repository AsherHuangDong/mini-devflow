/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import TaskFilter from './TaskFilter';
import type { Task } from '../../store/interface';
import { deleteTask, getTasks } from '../../store/taskstore';
import { addTask } from '../../store/taskstore';

const Tasks = () => {
	const [taskList, setTaskList] = useState<Task[]>([]);

	const getTaskList = async (): Promise<void> => {
		const tasks = await getTasks();
		setTaskList(tasks);
	};

	const taggleAddTask = async (title: string): Promise<void> => {
		if (!title.trim()) {
			alert('任务名称不能为空');
			return;
		}
		await addTask(title);
		getTaskList();
	};

	const onDeleteTask = async (task: Task): Promise<void> => {
		await deleteTask(task.id);
		setTaskList(taskList.filter((t) => t.id !== task.id));
	};

	useEffect(() => {
		getTaskList();
	}, []);

	return (
		<div>
			<TaskFilter />
			<TaskForm taggleAddTask={taggleAddTask} />
			<TaskList taskList={taskList} onDeleteTask={onDeleteTask} />
		</div>
	);
};

export default Tasks;
