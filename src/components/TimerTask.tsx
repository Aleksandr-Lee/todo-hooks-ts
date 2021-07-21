import React, { useEffect, useState } from 'react';

interface ITimerTask {
  id: string;
  timeTask: (id: string, time: number) => void;
  timer: number;
}

const TimerTask: React.FC<ITimerTask> = ({
  timer,
  timeTask,
  id,
}: ITimerTask) => {
  const [timerPlay, setTimerPlay] = useState<boolean>(false);
  const [timers, setTimer] = useState<number>(0);

  useEffect(() => {
    let timerId: any;
    if (timerPlay) {
      timerId = setInterval(() => {
        setTimer((timerTime) => timerTime + 1);
      }, 1000);
    }
    setTimer(timer);
    return () => clearInterval(timerId);
  }, [timerPlay, timer]);

  const startTimer = (): void => {
    setTimerPlay(true);
  };

  const pauseTimer = (): void => {
    setTimerPlay(false);
    timeTask(id, timers);
  };

  const minute: string = `0${Math.floor((timers % 3600) / 60)}`.slice(-2);
  const second: string = `0${timers % 60}`.slice(-2);
  return (
    <span className="description">
      <button
        type="button"
        aria-label="Запуск таймера"
        className="icon icon-play"
        onClick={startTimer}
      />
      <button
        type="button"
        aria-label="Остановка таймера"
        className="icon icon-pause"
        onClick={pauseTimer}
      />
      <span> {minute}</span>
      <span> :{second}</span>
    </span>
  );
};

TimerTask.defaultProps = {
  timer: 0,
  timeTask: () => {},
};

export default TimerTask;
