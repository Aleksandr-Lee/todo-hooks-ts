import React from 'react';
import buttonsFilter from './buttonsFilter';

interface ITaskFilter {
  filterTasks: string;
  onFilterTasks: (filters: string) => void;
}

const TaskFilter: React.FC<ITaskFilter> = ({
  filterTasks,
  onFilterTasks,
}: ITaskFilter) => {
  const buttons = buttonsFilter.map(({ name, text }) => {
    const isActive = filterTasks === name;
    const classBtn = isActive ? 'selected' : '';
    return (
      <li key={name}>
        <button
          type="button"
          className={classBtn}
          onClick={() => onFilterTasks(name)}
        >
          {text}
        </button>
      </li>
    );
  });
  return <ul className="filters">{buttons}</ul>;
};
TaskFilter.defaultProps = {
  filterTasks: buttonsFilter[0].name,
  onFilterTasks: () => {},
};

export default TaskFilter;
