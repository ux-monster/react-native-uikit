import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator, {TabParams} from './tabNavigator';
import StackNavigator, {StackParams} from './stackNavigator';

export type RootStackParamList = {
  BottomSheetScreen: undefined;
  DraggableListViewScreen: undefined;
  KeyboardAttachedViewScreen: undefined;
  ScrollableTabViewScreen: undefined;
  TimerViewScreen: undefined;
  ToastScreen: undefined;
  Stack: StackParams;
  Tab: TabParams;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="BottomSheetScreen" component={() => <></>} />
      <Stack.Screen name="DraggableListViewScreen" component={() => <></>} />
      <Stack.Screen name="KeyboardAttachedViewScreen" component={() => <></>} />
      <Stack.Screen name="ScrollableTabViewScreen" component={() => <></>} />
      <Stack.Screen name="TimerViewScreen" component={() => <></>} />
      <Stack.Screen name="ToastScreen" component={() => <></>} />
      <Stack.Screen name="Stack" component={StackNavigator} />
      <Stack.Screen name="Tab" component={TabNavigator} />
    </Stack.Navigator>
  );
};

export default RootNavigation;
