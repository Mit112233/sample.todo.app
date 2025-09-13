import { useState, type FormEvent } from 'react';
import './App.css';
import Title from './components/Title';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import type { Task } from './types';

function App() {
  const [inputTask, setInputTask] = useState('');
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [id, setId] = useState(1);
  const [error, setError] = useState(''); // エラーメッセージ用

  // タスク追加処理（重複チェックあり）
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputTask.trim() === '') return;

    // 重複チェック
    const isDuplicate = taskList.some(
      (task) => task.name.trim().toLowerCase() === inputTask.trim().toLowerCase()
    );
    if (isDuplicate) {
      setError('同じ名前のタスクはすでに存在します');
      return;
    }

    const newTask: Task = { id, name: inputTask.trim(), isDone: false };
    setTaskList([...taskList, newTask]);
    setId(id + 1);
    setInputTask('');
    setError(''); // エラーをクリア
  };

  // タスクの完了状態を切り替え
  const handleTaskChange = (taskId: number) => {
    setTaskList(
      taskList.map((task) =>
        task.id === taskId ? { ...task, isDone: !task.isDone } : task
      )
    );
  };

  // タスクを削除
  const handleRemoveTask = (taskId: number) => {
    setTaskList(taskList.filter((task) => task.id !== taskId));
  };

  // 完了済みタスクを一括削除
  const handleAllRemoveTask = () => {
    if (window.confirm('完了済みタスクをすべて削除してもよいですか？')) {
      setTaskList(taskList.filter((task) => !task.isDone));
    }
  };

  return (
    <div className="todo">
      <Title str="ToDo App" />
      <AddTask
        inputTask={inputTask}
        setInputTask={setInputTask}
        handleSubmit={handleSubmit}
        error={error} // エラーを渡す
      />
      <TaskList
        taskList={taskList}
        handleTaskChange={handleTaskChange}
        handleRemoveTask={handleRemoveTask}
        handleAllRemoveTask={handleAllRemoveTask}
      />
    </div>
  );
}

export default App;
