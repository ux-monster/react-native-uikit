import React, {useCallback, useEffect, useRef, useState} from 'react';
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
import ScrollableTabView from '../ScrollableTabView';

interface Props {
  children?: React.ReactNode;
}

const KeyboardAttachedView = ({children}: Props) => {
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

  const [visibleAddOn, setVisibleAddOn] = useState<boolean>(false);
  const showingAddOn = useRef<boolean>(false);
  const textInputRef = useRef<TextInput>(null);

  const handleBlur = () => {
    if (!showingAddOn.current) {
      setVisibleAddOn(false);
    }
  };

  const handleActivateAddOn = () => {
    Keyboard.dismiss();
    setVisibleAddOn(true);
    showingAddOn.current = true;
    setTimeout(() => {
      textInputRef.current?.focus();
      showingAddOn.current = false;
    }, 500);
  };

  return (
    <View style={styles.container}>
      <Animated.ScrollView>
        <TextInput
          ref={textInputRef}
          value="Enter input"
          showSoftInputOnFocus={!visibleAddOn}
          onBlur={handleBlur}
        />
        {children}
      </Animated.ScrollView>
      <View>
        {(visibleKeyboard || visibleAddOn) && (
          <TouchableOpacity onPress={handleActivateAddOn}>
            <Text>ADD ON - Tab</Text>
          </TouchableOpacity>
        )}
        {!visibleKeyboard && visibleAddOn && (
          <Animated.View style={{height: keyboardHeight.value}}>
            <Text>ADD ON - View</Text>
          </Animated.View>
        )}
      </View>
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
