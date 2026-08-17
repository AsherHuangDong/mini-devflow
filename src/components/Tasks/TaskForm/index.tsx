import { useState } from 'react';
import taskStore from '../../../store/taskStore';

const TaskForm = () => {
	const [title, setTitle] = useState('');

	const toggleAddTask = async (): Promise<void> => {
		await taskStore.fetchAddTask(title);
		setTitle('');
	};

	return (
		<div>
			<input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
			<button onClick={toggleAddTask}>Add</button>
		</div>
	);
};

export default TaskForm;
