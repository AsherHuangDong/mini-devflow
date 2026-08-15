import type { Task } from '../../../interface/tasks';
import TaskItem from '../TaskItem';

const TaskList = (
	props: { taskList: Task[]; onDeleteTask?: (id: Task['id']) => void } = { taskList: [] }
) => {
	return props.taskList.map((task) => (
		<TaskItem key={task.id} task={task} onDeleteTask={props.onDeleteTask} />
	));
};

export default TaskList;
