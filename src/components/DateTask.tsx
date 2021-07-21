/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

interface IDateTask {
  created: number;
}

const DateTask: React.FC<IDateTask> = ({ created }: IDateTask) => {
  const [timerId, setTimerId] = useState<number>(0);
  const taskCreationTimer = (): void => {
    const delay: number = 1000;
    clearTimeout(timerId);
    const newTimerId: any = setTimeout(() => {
      taskCreationTimer();
    }, delay);
    setTimerId(newTimerId);
  };

  useEffect(() => {
    taskCreationTimer();
    return () => setTimerId(timerId);
  }, []);

  const resultTimer = formatDistanceToNow(created, {
    includeSeconds: true,
  });

  return <span className="created">created {resultTimer} ago</span>;
};

export default DateTask;
