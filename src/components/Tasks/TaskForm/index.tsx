import { useState } from 'react';

const TaskForm = ({ taggleAddTask }: { taggleAddTask: (title: string) => void }) => {
	const [title, setTitle] = useState('');

	return (
		<div>
			<input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
			<button
				onClick={() => {
					taggleAddTask(title);
					setTitle('');
				}}
			>
				Add
			</button>
		</div>
	);
};

export default TaskForm;
