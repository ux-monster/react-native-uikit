import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// 라우팅 파라미터
export type StackParams = {
  Home: {};
  Profile: {};
};

const Stack = createNativeStackNavigator<StackParams>();

const StackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={() => <></>} />
    <Stack.Screen name="Profile" component={() => <></>} />
  </Stack.Navigator>
);

export default StackNavigator;

/**
 * [스크린 사용방법 - 스택]
 * interface HomeScreenProps extends NativeStackScreenProps<StackParams, 'Home'> {}
 * const HomeScreen = () => {
 *   const hello = useNavigation<HomeScreenProps>();
 *   hello.route.params.id;
 *   return <></>
 * }
 */
