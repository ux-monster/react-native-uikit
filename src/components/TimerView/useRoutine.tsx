import React, {useRef, useState} from 'react';
import {TimerHookReturnProps} from './useTimer';

interface RoutineTodo {
  id: string;
  title: string;
  duration: number;
}

const useRoutine = (
  timer: TimerHookReturnProps,
  routineTodoList: RoutineTodo[] = [
    {id: '1', title: '푸시업 - 5회', duration: 1},
    {id: '2', title: '싯업 - 10회', duration: 2},
    {id: '3', title: '스쿼트 - 15회', duration: 3},
    {id: '4', title: '점프 스쿼트 - 5회', duration: 1},
    {id: '5', title: '런지 - 10회', duration: 2},
    {id: '6', title: '리버스 크런치 15회', duration: 3},
  ],
) => {
  const [currentRoutineTodo, setCurrentRoutineTodo] = useState<RoutineTodo>(
    routineTodoList[0],
  );

  const start = () => {
    console.log('start', currentRoutineTodo);
    timer.start(currentRoutineTodo.duration);
  };

  const pause = () => {
    console.log('pause', currentRoutineTodo);
    timer.pause();
  };

  const resume = () => {
    console.log('resume', currentRoutineTodo);
    timer.resume();
  };

  const next = () => {
    console.log('next');
    const currentRoutineTodoIndex = routineTodoList.indexOf(currentRoutineTodo);
    const nextRoutineTodo: RoutineTodo =
      routineTodoList[currentRoutineTodoIndex + 1];
    setCurrentRoutineTodo(() => nextRoutineTodo);
    timer.restart(nextRoutineTodo.duration);
  };

  const stop = () => {
    console.log('stop');
    timer.stop();
  };

  return {
    currentRoutineTodo,
    start,
    pause,
    resume,
    next,
    stop,
  };
};

export default useRoutine;
