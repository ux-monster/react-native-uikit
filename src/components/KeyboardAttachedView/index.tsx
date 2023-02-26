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
import useInteraction from './useInteraction';

interface Props {
  children?: React.ReactNode;
}

const KeyboardAttachedView = ({children}: Props) => {
  const {
    textInputRef,
    visibleAddOn,
    visibleKeyboard,
    handleBlur,
    handleActivateAddOn,
    addOnViewStyle,
  } = useInteraction();

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
          <Animated.View style={addOnViewStyle}>
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
