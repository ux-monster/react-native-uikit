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
  withTiming,
} from 'react-native-reanimated';
import ScrollableTabView from '../ScrollableTabView';
import useInteraction from './useInteraction';

interface Props {
  children?: React.ReactNode;
}

const KeyboardAttachedView = ({children}: Props) => {
  const {
    textInputRef,
    selectedIndex,
    visibleAddOn,
    visibleKeyboard,
    handleBlur,
    handleActivateAddOn,
    addOnViewStyle,
    bottomContainerHeight,
    bottomContainerTransitionHeight,
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
      <Animated.View>
        {(visibleKeyboard || visibleAddOn) && (
          <View>
            {[1, 2, 3].map((n, i) => (
              <TouchableOpacity key={i} onPress={() => handleActivateAddOn(i)}>
                <Text>ADD ON - Tab - {i}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        {!visibleKeyboard && visibleAddOn && (
          <Animated.View style={addOnViewStyle}>
            {[1, 2, 3].map((n, i) =>
              selectedIndex === i ? (
                <View key={i}>
                  <Text>ADD ON - View - {i}</Text>
                </View>
              ) : null,
            )}
          </Animated.View>
        )}
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
