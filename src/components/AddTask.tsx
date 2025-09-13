import type { FormEvent } from 'react';

type AddTaskProps = {
  inputTask: string;
  setInputTask: (task: string) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  error?: string;
};

const AddTask = ({ inputTask, setInputTask, handleSubmit, error }: AddTaskProps) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Add New Task"
          value={inputTask}
          onChange={(e) => setInputTask(e.target.value)}
        />
        <button disabled={inputTask.length === 0}>Submit</button>
      </form>
      {error && <p style={{ color: 'red', marginTop: '4px' }}>{error}</p>}
    </div>
  );
};

export default AddTask;
