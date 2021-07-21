import React, { useState, useRef, useEffect } from 'react';

interface IAddTask {
  onAddTask: (task: string) => void;
}

const NewTaskForm: React.FC<IAddTask> = ({ onAddTask }: IAddTask) => {
  const [task, setTask] = useState<string>('');
  const autofocus = useRef<HTMLInputElement>(null);

  useEffect(() => {
    autofocus.current?.focus();
  }, []);

  const onEnterTask: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ): void => {
    setTask(event.target.value);
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (event): void => {
    event.preventDefault();
    if (task) {
      onAddTask(task);
      setTask('');
    }
  };

  return (
    <form className="new-todo-form" onSubmit={onSubmit}>
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        value={task}
        ref={autofocus}
        onChange={onEnterTask}
      />
    </form>
  );
};

NewTaskForm.defaultProps = {
  onAddTask: () => {},
};

export default NewTaskForm;
