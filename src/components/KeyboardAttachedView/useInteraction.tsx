import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Keyboard, Platform, KeyboardEvent, TextInput} from 'react-native';
import {useAnimatedStyle, useSharedValue} from 'react-native-reanimated';

const useInteraction = () => {
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

  const addOnViewStyle = useAnimatedStyle(() => {
    return {
      height: keyboardHeight.value,
    };
  });

  return {
    textInputRef,
    visibleAddOn,
    visibleKeyboard,
    handleBlur,
    handleActivateAddOn,
    addOnViewStyle,
  };
};

export default useInteraction;
