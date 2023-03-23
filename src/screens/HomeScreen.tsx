import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@/navigation';

type Props = {};

const HomeScreen = (props: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handlePress = () => {};

  return (
    <View>
      <Text>HomeScreen</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('BottomSheetScreen')}>
        <Text>BottomSheetScreen</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('DraggableListViewScreen')}>
        <Text>DraggableListViewScreen</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('KeyboardAttachedViewScreen')}>
        <Text>KeyboardAttachedViewScreen</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('ScrollableTabViewScreen')}>
        <Text>ScrollableTabViewScreen</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('TimerViewScreen')}>
        <Text>TimerViewScreen</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ToastScreen')}>
        <Text>ToastScreen</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
