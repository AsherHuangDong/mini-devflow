import { useState } from 'react';
import './index.css';
import type { Task } from '../../../interface/tasks';
import taskStore from '../../../store/taskStore';

const TaskItem = (props: { task: Task }) => {
	const [comptleted, setComptleted] = useState(props.task.completed);
	const [title, setTitle] = useState(props.task.title);
	const [editing, setEditing] = useState(false);
	const [deleting, setDeleting] = useState(false);

	const saveEdit = async (): Promise<void> => {
		try {
			const newTitle = title.trim();
			if (newTitle) {
				setTitle(newTitle);
				await taskStore.fetchEditTask(props.task.id, newTitle);
			}
			setEditing(false);
		} catch (error) {
			alert(error);
		}
	};

	const cancelEdit = (): void => {
		setTitle(props.task.title);
		setComptleted(props.task.completed);
		setEditing(false);
	};

	const changeCompleted = async (): Promise<void> => {
		try {
			await taskStore.fetchEditTask(props.task.id, title, !comptleted);
			setComptleted(!comptleted);
		} catch (error) {
			alert(error);
		}
	};

	const deleteTask = async (): Promise<void> => {
		setDeleting(true);
		try {
			await taskStore.fetchDeleteTask(props.task.id);
		} catch (e) {
			alert(e);
		} finally {
			setDeleting(false);
		}
	};

	return (
		<div className="taskItem">
			<input type="checkbox" checked={comptleted} onChange={changeCompleted} />
			{editing ? (
				<>
					<input
						type="text"
						value={title}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setTitle(e.target.value)
						}
					/>
					<button onClick={saveEdit}>保存</button>
					<button onClick={cancelEdit}>取消</button>
				</>
			) : (
				<>
					<div onClick={() => setEditing(true)}>{title}</div>

					<button onClick={deleteTask} disabled={deleting}>
						{deleting ? '删除中...' : '删除'}
					</button>
				</>
			)}
		</div>
	);
};

export default TaskItem;
