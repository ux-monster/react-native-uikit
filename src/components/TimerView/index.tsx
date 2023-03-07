import useTimer, {TimerState} from '@/hooks/useTimer';
import _ from 'lodash';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

interface TimerItem {
  id: string;
  title: string;
  duration: number;
}

const timerItems: TimerItem[] = [
  {id: '1', title: 'TimerItem 1', duration: 10},
  {id: '2', title: 'TimerItem 2', duration: 20},
  {id: '3', title: 'TimerItem 3', duration: 30},
  {id: '4', title: 'TimerItem 4', duration: 40},
  {id: '5', title: 'TimerItem 5', duration: 50},
];

interface Props {}

const TimerView = ({}: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const {timeInSeconds, timerState, start, restart, pause, resume, stop} =
    useTimer({});

  const handleStart = () => {
    start(timerItems[currentIndex].duration);
  };

  const handlePause = () => {
    pause();
  };

  const handleResume = () => {
    resume();
  };

  const handleNext = () => {
    const limit = timerItems.length;
    const nextIndex = currentIndex + 1;
    if (nextIndex < limit) {
      restart(timerItems[nextIndex].duration);
      setCurrentIndex(nextIndex);
    } else {
      stop();
      setCurrentIndex(0);
    }
  };

  const toTimeString = (_timeInSeconds: number) => {
    const absTimeInSeconds = Math.abs(_timeInSeconds);
    const time = moment.duration(absTimeInSeconds, 'seconds');

    const overAnHour = _timeInSeconds > 3600;
    if (overAnHour) {
      return moment.utc(time.asMilliseconds()).format('HH:mm:ss');
    } else {
      return moment.utc(time.asMilliseconds()).format('mm:ss');
    }
  };

  return (
    <View>
      <Text>{timerItems[currentIndex].title}</Text>
      <Text>{toTimeString(timeInSeconds)}</Text>
      {timerState === TimerState.STOPPED && (
        <TouchableOpacity onPress={handleStart}>
          <Text>start</Text>
        </TouchableOpacity>
      )}
      {timerState === TimerState.RUNNING && (
        <TouchableOpacity onPress={handlePause}>
          <Text>pause</Text>
        </TouchableOpacity>
      )}
      {timerState === TimerState.PAUSED && (
        <TouchableOpacity onPress={handleResume}>
          <Text>resume</Text>
        </TouchableOpacity>
      )}
      {timerState === TimerState.RUNNING && (
        <TouchableOpacity onPress={handleNext}>
          <Text>next</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default TimerView;
