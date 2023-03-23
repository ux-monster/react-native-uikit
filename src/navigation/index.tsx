import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator, {TabParams} from './tabNavigator';
import StackNavigator, {StackParams} from './stackNavigator';

export type RootStackParamList = {
  Hello1: undefined;
  Hello2: undefined;
  Hello3: undefined;
  Stack: StackParams;
  Tab: TabParams;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Hello1" component={() => <></>} />
      <Stack.Screen name="Hello2" component={() => <></>} />
      <Stack.Screen name="Hello3" component={() => <></>} />
      <Stack.Screen name="Stack" component={StackNavigator} />
      <Stack.Screen name="Tab" component={TabNavigator} />
    </Stack.Navigator>
  );
};

export default RootNavigation;
