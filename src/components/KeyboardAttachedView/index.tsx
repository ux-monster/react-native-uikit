import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  Keyboard,
  KeyboardEvent,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
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
  const [visibleAddOn, setVisibleAddOn] = useState<boolean>(false);
  const [visibleKeyboard, setVisibleKeyboard] = useState<boolean>(false);
  const keyboardHeight = useSharedValue<number>(0);

  const handleShowKeyboard = useCallback(
    (e: KeyboardEvent) => {
      const height = e.endCoordinates.height;
      keyboardHeight.value = height;
      setVisibleKeyboard(true);
    },
    [keyboardHeight],
  );

  const handleHideKeyboard = useCallback((_: KeyboardEvent) => {
    setVisibleKeyboard(false);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      bottom: !visibleKeyboard && visibleAddOn ? keyboardHeight.value : 0,
    };
  }, [visibleAddOn, visibleKeyboard, keyboardHeight]);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      const keyboardWillShow = Keyboard.addListener(
        'keyboardWillShow',
        handleShowKeyboard,
      );
      const keyboardWillHide = Keyboard.addListener(
        'keyboardWillHide',
        handleHideKeyboard,
      );
      return () => {
        keyboardWillShow?.remove();
        keyboardWillHide?.remove();
      };
    } else {
      const keyboardDidShow = Keyboard.addListener(
        'keyboardDidShow',
        handleShowKeyboard,
      );
      const keyboardDidHide = Keyboard.addListener(
        'keyboardDidHide',
        handleHideKeyboard,
      );
      return () => {
        keyboardDidShow?.remove();
        keyboardDidHide?.remove();
      };
    }
  }, [handleShowKeyboard, handleHideKeyboard]);

  return (
    <View style={styles.container}>
      <Animated.ScrollView>
        <TextInput
          blurOnSubmit={false}
          value="Enter input"
          onBlur={() => {
            return false;
          }}
        />
        {children}
      </Animated.ScrollView>
      <Animated.View
        style={[
          {
            position: 'absolute',
            left: 0,
          },
          animatedStyle,
        ]}>
        <Text>BottomView</Text>
        <TouchableOpacity
          onPress={() => {
            setVisibleAddOn(true);
            setVisibleKeyboard(false);
            Keyboard.dismiss();
          }}>
          <Text>ADD ON - Tab</Text>
        </TouchableOpacity>
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
  bottomContainer: {
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
});
