import type { Task } from '../types';

type TaskListProps = {
  taskList: Task[];
  handleTaskChange: (id: number) => void;
  handleRemoveTask: (id: number) => void;
  handleAllRemoveTask: () => void;
};

const TaskList = ({
  taskList,
  handleTaskChange,
  handleRemoveTask,
  handleAllRemoveTask
}: TaskListProps) => {
  return (
    <ul>
      {taskList.length === 0 ? (
        <p>タスクを追加してください</p>
      ) : (
        taskList.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.isDone}
              onChange={() => handleTaskChange(task.id)}
            />
            <span
              style={{ textDecoration: task.isDone ? 'line-through' : 'none', marginLeft: '8px' }}
            >
              {task.name}
            </span>
            <button
              className="danger"
              style={{ marginLeft: '8px' }}
              onClick={() => handleRemoveTask(task.id)}
            >
              ☓
            </button>
          </li>
        ))
      )}
      {taskList.length > 0 && (
        <button
          className="danger delete"
          onClick={handleAllRemoveTask}
          style={{ marginTop: '8px' }}
        >
          delete all
        </button>
      )}
    </ul>
  );
};

export default TaskList;
