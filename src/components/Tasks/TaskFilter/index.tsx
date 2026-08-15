import { useState } from 'react';
import type { TaskFilterRequest } from '../../../store/interface';

const TaskFilter = () => {
	const [filter, setFilter] = useState<TaskFilterRequest>({
		title: '',
		completed: undefined,
		startCreatedAt: undefined,
		endCreatedAt: undefined,
	});

	const handleTitleFilter = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setFilter({ ...filter, title: e.target.value });
	};

	const handleCompletedFilter = (e: React.ChangeEvent<HTMLSelectElement>): void => {
		setFilter({ ...filter, completed: e.target.value === 'true' ? true : false });
	};

	return (
		<form action="" method="get">
			<label htmlFor="title">输入任务名称: </label>
			<input type="text" value={filter.title} onChange={handleTitleFilter} />
			<label htmlFor="completed">选择任务状态：</label>
			<select defaultValue={''} onChange={handleCompletedFilter}>
				<option value="" disabled style={{ display: 'none' }}>
					--请选择--
				</option>
				<option value="true">true</option>
				<option value="false">false</option>
			</select>
		</form>
	);
};

export default TaskFilter;
