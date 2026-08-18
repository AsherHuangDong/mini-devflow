import { useEffect, useRef, useState } from 'react';
import type { TaskFilterRequest } from '../../../interface/tasks';
import taskStore from '../../../store/taskStore';
import useDebounce from '../../../hooks/useDebounce';

const DefaultTaskFilterRequest = {
	title: '',
	completed: undefined,
	startCreatedAt: undefined,
	endCreatedAt: undefined,
};

const TaskFilter = () => {
	const [filter, setFilter] = useState<TaskFilterRequest>(DefaultTaskFilterRequest);
	const isFirstRender = useRef(true);
	const delayFilter = useDebounce(filter, 300) as TaskFilterRequest;

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}
		taskStore.fetchTasks(delayFilter);
	}, [delayFilter]);

	const clearFilter = () => {
		setFilter(DefaultTaskFilterRequest);
	};

	const handleTitleFilter = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setFilter((prev) => ({ ...prev, title: e.target.value }));
	};

	const handleCompletedFilter = (e: React.ChangeEvent<HTMLSelectElement>): void => {
		if (e.target.value === '') {
			setFilter((prev) => ({ ...prev, completed: undefined }));
			return;
		}
		setFilter((prev) => ({ ...prev, completed: e.target.value === 'true' ? true : false }));
	};

	return (
		<div>
			<label htmlFor="title">输入任务名称: </label>
			<input type="text" value={filter.title} onChange={handleTitleFilter} />
			<label htmlFor="completed">选择任务状态：</label>
			<select
				value={filter.completed === undefined ? '' : filter.completed ? 'true' : 'false'}
				id="completed"
				name="completed"
				onChange={handleCompletedFilter}
			>
				<option value="">全部</option>
				<option value="true">已完成</option>
				<option value="false">未完成</option>
			</select>
			<button onClick={clearFilter}>清除筛选</button>
		</div>
	);
};

export default TaskFilter;
