import useTimer from '@/hooks/useTimer';
import React, {useEffect} from 'react';
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
  const {timeInSeconds, start, stop, pause, restart} = useTimer({});

  useEffect(() => {
    start();
  }, [start]);

  const handlePause = () => {
    pause();
  };

  const handleRestart = () => {
    restart();
  };

  return (
    <View>
      <Text>{timeInSeconds}</Text>
      <TouchableOpacity onPress={handlePause}>
        <Text>pause</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRestart}>
        <Text>restart</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TimerView;
