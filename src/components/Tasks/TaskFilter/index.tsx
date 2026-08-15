import { useEffect, useState } from 'react';
import useDebounce from '../../../hooks/useDebounce';
import type { TaskFilterRequest } from '../../../interface/tasks';

const TaskFilter = ({
	onFilterChange,
}: {
	onFilterChange?: (taskFiletrRequest: TaskFilterRequest) => void;
}) => {
	const DefaultTaskFilterRequest = {
		completed: undefined,
		startCreatedAt: undefined,
		endCreatedAt: undefined,
	};

	const [filter, setFilter] = useState<TaskFilterRequest>(DefaultTaskFilterRequest);
	const [title, setTitle] = useState('');

	const debounceTitle = useDebounce(title, 300);

	useEffect(() => {
		onFilterChange?.({ ...filter, title: debounceTitle });
	}, [debounceTitle, filter, onFilterChange]);

	const clearFilter = () => {
		setFilter(DefaultTaskFilterRequest);
		setTitle('');
	};

	const handleTitleFilter = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setTitle(e.target.value);
	};

	const handleCompletedFilter = (e: React.ChangeEvent<HTMLSelectElement>): void => {
		if (e.target.value === '') {
			setFilter({ ...filter, completed: undefined });
			return;
		}
		setFilter({ ...filter, completed: e.target.value === 'true' ? true : false });
	};

	return (
		<div>
			<label htmlFor="title">输入任务名称: </label>
			<input type="text" value={title} onChange={handleTitleFilter} />
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
