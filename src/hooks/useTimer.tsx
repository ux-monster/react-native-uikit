import {useRef, useState} from 'react';

interface TimerHookProps {}

export interface TimerHookReturnProps {
  timeInSeconds: number;
  start: () => void;
  pause: () => void;
  restart: () => void;
  stop: () => void;
}

const useTimer = ({}: TimerHookProps): TimerHookReturnProps => {
  const [timeInSeconds, setTimeInSeconds] = useState<number>(0);
  const timerInterval = useRef<NodeJS.Timer>();

  const _startTimer = (startTimeInSeconds?: number) => {
    startTimeInSeconds && setTimeInSeconds(() => startTimeInSeconds);
    setInterval(() => {
      setTimeInSeconds(timeInSeconds + 1);
    }, 1000);
  };

  const _stopTimer = () => {
    clearInterval(timerInterval.current);
    setTimeInSeconds(0);
  };

  const start = () => {
    _startTimer(0);
  };

  const pause = () => {
    _stopTimer();
  };

  const restart = () => {
    _startTimer();
  };

  const stop = () => {
    _stopTimer();
  };

  return {
    timeInSeconds,
    start,
    pause,
    restart,
    stop,
  };
};

export default useTimer;
