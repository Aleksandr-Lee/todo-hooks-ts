import React, { useState, useEffect, useRef } from 'react';
import DateTask from './DateTask';
import TimerTask from './TimerTask';
import { ITodo } from '../types/data';

interface ITaskItem extends ITodo {
  onDeletTask: (id: string) => void;
  editingTask: (text: string, id: string) => void;
  onCompletedTask: () => void;
  timeTask: (id: string, time: number) => void;
}

const Task: React.FC<ITaskItem> = ({
  completed,
  editing,
  onCompletedTask,
  task,
  created,
  editingTask,
  id,
  onDeletTask,
  timer,
  timeTask,
}: ITaskItem) => {
  const [value, setValue] = useState<string>('');
  const autofocus = useRef<HTMLInputElement>(null);

  const onEnterEdit = (tasks: string): void => {
    setValue(tasks);
  };

  useEffect(() => {
    setValue(task);
    autofocus.current?.focus();
  }, [task, editingTask]);

  const onSubmitEdit: React.FormEventHandler<HTMLFormElement> = (
    event
  ): void => {
    event.preventDefault();
    editingTask(value, id);
    if (!value) onDeletTask(id);
  };

  let classNames;
  if (completed) classNames = 'completed';
  if (editing) classNames = 'editing';

  return (
    <li className={classNames}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={completed}
          onChange={onCompletedTask}
        />
        <label>
          <span className="title">{task}</span>
          <TimerTask timer={timer} timeTask={timeTask} id={id} />
          <span className="description">
            <DateTask created={created} />
          </span>
        </label>
        <button
          type="button"
          aria-label="Изменение задачи"
          className="icon icon-edit"
          onClick={() => {
            editingTask(task, id);
            onEnterEdit(task);
          }}
        />
        <button
          type="button"
          aria-label="Удвление задачи"
          className="icon icon-destroy"
          onClick={() => onDeletTask(id)}
        />
      </div>
      <form onSubmit={onSubmitEdit}>
        <input
          ref={autofocus}
          type="text"
          className="edit"
          value={value}
          onChange={(event) => onEnterEdit(event.target.value)}
        />
      </form>
    </li>
  );
};

Task.defaultProps = {
  completed: false,
  editing: false,
  timer: 0,
  timeTask: () => {},
  editingTask: () => {},
  onCompletedTask: () => {},
  onDeletTask: () => {},
};

export default Task;
