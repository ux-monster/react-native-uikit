import React from 'react';
import {Text, TextInput, View} from 'react-native';
import Animated from 'react-native-reanimated';

interface Props {
  children?: React.ReactNode;
}

const KeyboardAttachedView = ({children}: Props) => {
  return (
    <View>
      <Animated.ScrollView>
        <TextInput value="Enter input" />
        {children}
      </Animated.ScrollView>
      <View>
        <Text>BottomView</Text>
      </View>
    </View>
  );
};

export default KeyboardAttachedView;
