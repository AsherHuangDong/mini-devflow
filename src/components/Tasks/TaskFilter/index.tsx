import { useEffect, useMemo, useState } from 'react';
import type { TaskFilterRequest } from '../../../store/interface';

const TaskFilter = ({
	onFilterChange,
}: {
	onFilterChange?: (taskFiletrRequest: TaskFilterRequest) => void;
}) => {
	const DefaultTaskFilterRequest = {
		title: '',
		completed: undefined,
		startCreatedAt: undefined,
		endCreatedAt: undefined,
	};

	const [filter, setFilter] = useState<TaskFilterRequest>(DefaultTaskFilterRequest);

	useEffect(() => {
		onFilterChange?.(filter);
	}, [filter, onFilterChange]);

	const handleTitleFilter = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setFilter({ ...filter, title: e.target.value });
	};

	const handleCompletedFilter = (e: React.ChangeEvent<HTMLSelectElement>): void => {
		if (e.target.value === '') {
			setFilter({ ...filter, completed: undefined });
			return;
		}
		setFilter({ ...filter, completed: e.target.value === 'true' ? true : false });
	};

	const completed = useMemo(() => {
		if (filter.completed === undefined) {
			return '';
		}
		return filter.completed ? 'true' : 'false';
	}, [filter.completed]);

	return (
		<div>
			<label htmlFor="title">输入任务名称: </label>
			<input type="text" value={filter.title} onChange={handleTitleFilter} />
			<label htmlFor="completed">选择任务状态：</label>
			<select
				value={completed}
				id="completed"
				name="completed"
				onChange={handleCompletedFilter}
			>
				<option value="">全部</option>
				<option value="true">已完成</option>
				<option value="false">未完成</option>
			</select>
			<button onClick={() => setFilter(DefaultTaskFilterRequest)}>清除筛选</button>
		</div>
	);
};

export default TaskFilter;
