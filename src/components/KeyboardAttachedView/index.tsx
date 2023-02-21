import React, {useCallback, useEffect, useState} from 'react';
import {
  Keyboard,
  KeyboardEvent,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

interface Props {
  children?: React.ReactNode;
}

const KeyboardAttachedView = ({children}: Props) => {
  const [shown, setShown] = useState(false);
  const keyboardHeight = useSharedValue<number>(0);

  const handleShowKeyboard = useCallback(
    (e: KeyboardEvent) => {
      const height = e.endCoordinates.height;
      keyboardHeight.value = height;
      setShown(true);
    },
    [keyboardHeight],
  );

  const handleHideKeyboard = useCallback((_: KeyboardEvent) => {
    setShown(false);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      left: 0,
      bottom: keyboardHeight.value,
    };
  });

  useEffect(() => {
    const keyboardDidShow = Keyboard.addListener(
      'keyboardDidShow',
      handleShowKeyboard,
    );
    const keyboardWillShow = Keyboard.addListener(
      'keyboardWillShow',
      handleShowKeyboard,
    );
    const keyboardDidHide = Keyboard.addListener(
      'keyboardDidHide',
      handleHideKeyboard,
    );
    const keyboardWillHide = Keyboard.addListener(
      'keyboardWillHide',
      handleHideKeyboard,
    );
    return () => {
      Keyboard.removeSubscription(keyboardDidHide);
      Keyboard.removeSubscription(keyboardDidShow);
      Keyboard.removeSubscription(keyboardWillHide);
      Keyboard.removeSubscription(keyboardWillShow);
    };
  }, [handleShowKeyboard, handleHideKeyboard]);

  return (
    <View style={styles.container}>
      <Animated.ScrollView>
        <TextInput value="Enter input" />
        {children}
      </Animated.ScrollView>
      <Animated.View style={[shown && animatedStyle]}>
        <Text>BottomView</Text>
      </Animated.View>
    </View>
  );
};

export default KeyboardAttachedView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
});
