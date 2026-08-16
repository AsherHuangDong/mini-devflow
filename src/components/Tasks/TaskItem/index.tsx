import { useState, useSyncExternalStore } from 'react';
import './index.css';
import type { Task } from '../../../interface/tasks';
import { editTask } from '../../../api/tasks';
import taskStore from '../../../store/taskStore';

const TaskItem = (props: { task: Task; onDeleteTask?: (id: Task['id']) => void }) => {
	const deletingIds = useSyncExternalStore(
		(listener) => taskStore.subscribe(listener),
		() => taskStore.getSnapshot().deletingIds
	);
	const [comptleted, setComptleted] = useState(props.task.completed);
	const [title, setTitle] = useState(props.task.title);
	const [showInput, setShowInput] = useState(false);
	const isDeleteing = deletingIds.has(props.task.id);

	const taggleChangeTitle = async (e: React.FocusEvent<HTMLInputElement>): Promise<void> => {
		const newTitle = e.target.value.trim();
		if (newTitle) {
			setTitle(newTitle);
			await editTask(props.task.id, newTitle);
		}
		setShowInput(false);
	};

	const changeCompleted = async (): Promise<void> => {
		setComptleted(!comptleted);
		await editTask(props.task.id, title, !comptleted);
	};

	return (
		<div className="taskItem">
			<input type="checkbox" checked={comptleted} onChange={changeCompleted} />
			{showInput ? (
				<input
					type="text"
					value={title}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
					onBlur={taggleChangeTitle}
				/>
			) : (
				<div onClick={() => setShowInput(true)}>{title}</div>
			)}
			<button onClick={() => props?.onDeleteTask?.(props.task.id)} disabled={isDeleteing}>
				{isDeleteing ? '删除中...' : '删除'}
			</button>
		</div>
	);
};

export default TaskItem;
