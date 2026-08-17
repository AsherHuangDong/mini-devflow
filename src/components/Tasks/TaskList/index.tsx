import type { Task } from '../../../interface/tasks';
import TaskItem from '../TaskItem';

const TaskList = (props: { taskList: Task[] } = { taskList: [] }) => {
	return props.taskList.map((task) => <TaskItem key={task.id} task={task} />);
};

export default TaskList;
