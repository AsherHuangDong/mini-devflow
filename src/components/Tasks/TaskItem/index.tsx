import { useState } from 'react';
import './index.css';
import type { Task } from '../../../interface/tasks';
import taskStore from '../../../store/taskStore';

const TaskItem = (props: { task: Task }) => {
	const [completed, setcompleted] = useState(props.task.completed);
	const [title, setTitle] = useState(props.task.title);
	const [editing, setEditing] = useState(false);
	const [deleting, setDeleting] = useState(false);

	const saveEdit = async (): Promise<void> => {
		try {
			const newTitle = title.trim();
			if (newTitle === '') {
				throw new Error('任务名称不能为空');
			}
			await taskStore.fetchEditTask(props.task.id, newTitle, completed);
			setEditing(false);
		} catch (error) {
			alert(error);
		}
	};

	const cancelEdit = (): void => {
		setTitle(props.task.title);
		setcompleted(props.task.completed);
		setEditing(false);
	};

	const changeCompleted = async (): Promise<void> => {
		setcompleted(!completed);
	};

	const deleteTask = async (e: React.MouseEvent): Promise<void> => {
		e.stopPropagation();
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
			{editing ? (
				<>
					<input type="checkbox" checked={completed} onChange={changeCompleted} />
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
				<div className="taskItemContent" onClick={() => setEditing(true)}>
					<span className={props.task.completed ? 'complete completed' : 'complete'}>
						{props.task.completed ? '已完成' : '未完成'}
					</span>

					<div>{props.task.title}</div>

					<button onClick={deleteTask} disabled={deleting}>
						{deleting ? '删除中...' : '删除'}
					</button>
				</div>
			)}
		</div>
	);
};

export default TaskItem;
