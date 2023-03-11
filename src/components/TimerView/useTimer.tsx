import {useRef, useState} from 'react';

export interface Timer {
  timeInSeconds: number;
  timerState: TimerState;
  start: (startTimeInSeconds?: number) => void;
  restart: (startTimeInSeconds?: number) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
}

export enum TimerState {
  STOPPED = 'STOPPED',
  RUNNING = 'RUNNING',
  PAUSED = 'PAUSED',
}

const useTimer = (): Timer => {
  const [timeInSeconds, setTimeInSeconds] = useState<number>(0);
  const [timerState, setTimerState] = useState<TimerState>(TimerState.STOPPED);
  const timerInterval = useRef<NodeJS.Timer>();

  const start = (startTimeInSeconds?: number) => {
    if (timerState === TimerState.STOPPED) {
      setTimerState(TimerState.RUNNING);
      startTimeInSeconds && setTimeInSeconds(() => startTimeInSeconds);
      timerInterval.current = setInterval(() => {
        setTimeInSeconds(prev => prev - 1);
      }, 1000);
    }
  };

  const restart = (startTimeInSeconds?: number) => {
    if (timerState === TimerState.RUNNING) {
      clearInterval(timerInterval.current);
      startTimeInSeconds && setTimeInSeconds(() => startTimeInSeconds);
      timerInterval.current = setInterval(() => {
        setTimeInSeconds(prev => prev - 1);
      }, 1000);
    }
  };

  const pause = () => {
    if (timerState === TimerState.RUNNING) {
      setTimerState(TimerState.PAUSED);
      clearInterval(timerInterval.current);
    }
  };

  const resume = () => {
    if (timerState === TimerState.PAUSED) {
      setTimerState(TimerState.RUNNING);
      clearInterval(timerInterval.current);
      timerInterval.current = setInterval(() => {
        setTimeInSeconds(prev => prev - 1);
      }, 1000);
    }
  };

  const stop = () => {
    if (timerState === TimerState.RUNNING) {
      setTimerState(TimerState.STOPPED);
      clearInterval(timerInterval.current);
      setTimeInSeconds(0);
    }
  };

  return {
    timeInSeconds,
    timerState,
    start,
    restart,
    pause,
    resume,
    stop,
  };
};

export default useTimer;
