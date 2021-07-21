import React from 'react';
import TaskFilter from './TasksFilter';
import buttonsFilter from './buttonsFilter';
import { ITodo } from '../types/data';

interface IFooter {
  itemsLeftCount: number;
  filterTasks: string;
  onFilterTasks: (filters: string) => void;
  onClearCompletedTasks: (completedTask: ITodo[]) => void;
  completedTask: ITodo[];
}

const Footer: React.FC<IFooter> = ({
  itemsLeftCount,
  filterTasks,
  onFilterTasks,
  onClearCompletedTasks,
  completedTask,
}: IFooter) => (
  <footer className="footer">
    <span className="todo-count">{itemsLeftCount} items left</span>
    <TaskFilter filterTasks={filterTasks} onFilterTasks={onFilterTasks} />
    <button
      type="button"
      className="clear-completed"
      onClick={() => onClearCompletedTasks(completedTask)}
    >
      Clear completed
    </button>
  </footer>
);

Footer.defaultProps = {
  itemsLeftCount: 0,
  filterTasks: buttonsFilter[0].name,
  onFilterTasks: () => {},
  onClearCompletedTasks: () => {},
};

export default Footer;
