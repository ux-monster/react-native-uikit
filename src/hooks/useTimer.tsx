import {useRef, useState} from 'react';

interface TimerHookProps {}

export interface TimerHookReturnProps {
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

const useTimer = ({}: TimerHookProps): TimerHookReturnProps => {
  const [timeInSeconds, setTimeInSeconds] = useState<number>(0);
  const [timerState, setTimerState] = useState<TimerState>(TimerState.STOPPED);
  const timerInterval = useRef<NodeJS.Timer>();

  const _startTimer = (startTimeInSeconds?: number) => {
    if (timerState === TimerState.STOPPED) {
      setTimerState(TimerState.RUNNING);
      startTimeInSeconds && setTimeInSeconds(() => startTimeInSeconds);
      timerInterval.current = setInterval(() => {
        setTimeInSeconds(prev => prev - 1);
      }, 1000);
    }
  };

  const _restartTimer = (startTimeInSeconds?: number) => {
    if (timerState === TimerState.RUNNING) {
      clearInterval(timerInterval.current);
      startTimeInSeconds && setTimeInSeconds(() => startTimeInSeconds);
      timerInterval.current = setInterval(() => {
        setTimeInSeconds(prev => prev - 1);
      }, 1000);
    }
  };

  const _pauseTimer = () => {
    if (timerState === TimerState.RUNNING) {
      setTimerState(TimerState.PAUSED);
      clearInterval(timerInterval.current);
    }
  };

  const _resumeTimer = () => {
    if (timerState === TimerState.PAUSED) {
      setTimerState(TimerState.RUNNING);
      clearInterval(timerInterval.current);
      timerInterval.current = setInterval(() => {
        setTimeInSeconds(prev => prev - 1);
      }, 1000);
    }
  };

  const _stopTimer = () => {
    if (timerState === TimerState.RUNNING) {
      setTimerState(TimerState.STOPPED);
      clearInterval(timerInterval.current);
      setTimeInSeconds(0);
    }
  };

  const start = (startTimeInSeconds?: number) => {
    _startTimer(startTimeInSeconds);
  };

  const restart = (startTimeInSeconds?: number) => {
    _restartTimer(startTimeInSeconds);
  };

  const pause = () => {
    _pauseTimer();
  };

  const resume = () => {
    _resumeTimer();
  };

  const stop = () => {
    _stopTimer();
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
