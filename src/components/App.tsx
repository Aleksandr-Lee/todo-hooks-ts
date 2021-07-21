import React, { useState, useEffect } from 'react';
import { v4 } from 'uuid';
import { ITodo } from '../types/data';
import Header from './Header';
import NewTaskForm from './NewTaskForm';
import TaskList from './TaskList';
import Footer from './Footer';
import buttonsFilter from './buttonsFilter';
import '../index.css';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<ITodo[]>([]);
  const [filterTasks, setFilterTasks] = useState<string>(buttonsFilter[0].name);

  useEffect(() => {
    const taskSave = JSON.parse(localStorage.getItem('tasks') || '[]');
    setTasks(taskSave);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const onCompletedTask = (id: string): void => {
    const idx = tasks.findIndex((el) => el.id === id);
    const oldTask = tasks[idx];
    const newTask = {
      ...oldTask,
      completed: !oldTask.completed,
    };
    const newArray = [...tasks.slice(0, idx), newTask, ...tasks.slice(idx + 1)];
    setTasks(newArray);
  };

  const addTask = (text: string): void => {
    const newTask = {
      id: v4(),
      task: text,
      completed: false,
      editing: false,
      created: Date.now(),
      timer: 0,
    };
    setTasks([...tasks, newTask]);
  };

  const deletTask = (id: string): void => {
    const newArray = tasks.filter((el) => el.id !== id);
    setTasks(newArray);
  };

  const editingTask = (text: string, id: string): void => {
    const idx = tasks.findIndex((el) => el.id === id);
    const oldTask = tasks[idx];
    const newTask = {
      ...oldTask,
      task: text,
      editing: !oldTask.editing,
    };
    const newArray = [...tasks.slice(0, idx), newTask, ...tasks.slice(idx + 1)];
    setTasks(newArray);
  };

  const timeTask = (id: string, time: number): void | ITodo[] => {
    const idx = tasks.findIndex((el) => el.id === id);
    if (tasks[idx] === undefined) {
      return [];
    }
    const newTask = {
      ...tasks[idx],
      timer: time,
    };
    const newArray = [...tasks.slice(0, idx), newTask, ...tasks.slice(idx + 1)];
    return setTasks(newArray);
  };

  const filterTask = (task: ITodo[], filter: string): ITodo[] => {
    switch (filter) {
      case buttonsFilter[0].name:
        return task;
      case buttonsFilter[1].name:
        return task.filter((el) => !el.completed);
      case buttonsFilter[2].name:
        return task.filter((el) => el.completed);
      default:
        return task;
    }
  };

  const onFilterTasks = (filters: string): void => {
    setFilterTasks(filters);
  };

  const clearCompletedTasks = (): void => {
    const newArr = tasks.filter((el) => !el.completed);
    setTasks(newArr);
  };

  const itemsLeftCount = tasks.filter((el) => !el.completed).length;
  const completedTask = tasks.filter((el) => el.completed);
  const filterArr = filterTask(tasks, filterTasks);

  return (
    <div>
      <Header />
      <NewTaskForm onAddTask={addTask} />
      <TaskList
        task={filterArr}
        onDeletTask={deletTask}
        editingTask={editingTask}
        onCompletedTask={onCompletedTask}
        timeTask={timeTask}
      />
      <Footer
        itemsLeftCount={itemsLeftCount}
        filterTasks={filterTasks}
        onFilterTasks={onFilterTasks}
        completedTask={completedTask}
        onClearCompletedTasks={clearCompletedTasks}
      />
    </div>
  );
};

export default App;
