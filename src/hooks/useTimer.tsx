import {useRef, useState} from 'react';

interface TimerHookProps {}

export interface TimerHookReturnProps {
  timeInSeconds: number;
  timerState: TimerState;
  start: () => void;
  pause: () => void;
  stop: () => void;
}

export enum TimerState {
  STOPPED = 'STOPPED',
  RUNNING = 'RUNNING',
}

const useTimer = ({}: TimerHookProps): TimerHookReturnProps => {
  const [timeInSeconds, setTimeInSeconds] = useState<number>(0);
  const [timerState, setTimerState] = useState<TimerState>(TimerState.STOPPED);
  const timerInterval = useRef<NodeJS.Timer>();

  const _startTimer = () => {
    if (timerState === TimerState.STOPPED) {
      setTimerState(TimerState.RUNNING);
      timerInterval.current = setInterval(() => {
        setTimeInSeconds(prev => prev + 1);
      }, 1000);
    }
  };

  const _pauseTimer = () => {
    if (timerState === TimerState.RUNNING) {
      setTimerState(TimerState.STOPPED);
      clearInterval(timerInterval.current);
    }
  };

  const _stopTimer = () => {
    if (timerState === TimerState.RUNNING) {
      setTimerState(TimerState.STOPPED);
      clearInterval(timerInterval.current);
      setTimeInSeconds(0);
    }
  };

  const start = () => {
    _startTimer();
  };

  const pause = () => {
    _pauseTimer();
  };

  const stop = () => {
    _stopTimer();
  };

  return {
    timeInSeconds,
    timerState,
    start,
    pause,
    stop,
  };
};

export default useTimer;
