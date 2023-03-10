import moment from 'moment';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import useRoutine from './useRoutine';
import useTimer, {TimerState} from './useTimer';

const Example = () => {
  const timer = useTimer();
  const routine = useRoutine(timer);

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
      <Text>Hello</Text>
      <Text>{routine.currentRoutineTodo?.title}</Text>
      <Text>{toTimeString(timer.timeInSeconds)}</Text>
      {timer.timerState === TimerState.STOPPED && (
        <TouchableOpacity onPress={routine.start}>
          <Text>start</Text>
        </TouchableOpacity>
      )}
      {timer.timerState === TimerState.RUNNING && (
        <TouchableOpacity onPress={routine.pause}>
          <Text>pause</Text>
        </TouchableOpacity>
      )}
      {timer.timerState === TimerState.PAUSED && (
        <TouchableOpacity onPress={routine.resume}>
          <Text>resume</Text>
        </TouchableOpacity>
      )}
      {timer.timerState === TimerState.RUNNING && (
        <TouchableOpacity onPress={routine.next}>
          <Text>next</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Example;
