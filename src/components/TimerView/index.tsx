import React from 'react';
import {Text, View} from 'react-native';

interface Todo {
  id: string;
  title: string;
  duration: number;
}

const todoList: Todo[] = [
  {id: '1', title: 'Todo 1', duration: 10},
  {id: '2', title: 'Todo 2', duration: 20},
  {id: '3', title: 'Todo 3', duration: 30},
  {id: '4', title: 'Todo 4', duration: 40},
  {id: '5', title: 'Todo 5', duration: 50},
];

interface Props {}

const TimerView = ({}: Props) => {
  console.log(todoList);

  return (
    <View>
      <Text>123</Text>
    </View>
  );
};

export default TimerView;
