import React from 'react';
import Task from './Task';
import { ITodo } from '../types/data';

interface ITaskList {
  task: ITodo[];
  onDeletTask: (id: string) => void;
  editingTask: (text: string, id: string) => void;
  onCompletedTask: (id: string) => void;
  timeTask: (id: string, time: number) => void;
}

const TaskList: React.FC<ITaskList> = ({
  task,
  onDeletTask,
  editingTask,
  onCompletedTask,
  timeTask,
}: ITaskList) => {
  const element = task.map((item) => (
    <Task
      task={item.task}
      key={item.id}
      id={item.id}
      completed={item.completed}
      editing={item.editing}
      created={item.created}
      timer={item.timer}
      onDeletTask={() => onDeletTask(item.id)}
      editingTask={editingTask}
      onCompletedTask={() => onCompletedTask(item.id)}
      timeTask={timeTask}
    />
  ));
  return (
    <section className="main">
      <ul className="todo-list">{element}</ul>
    </section>
  );
};

TaskList.defaultProps = {
  onDeletTask: () => {},
  editingTask: () => {},
  onCompletedTask: () => {},
  timeTask: () => {},
};

export default TaskList;
