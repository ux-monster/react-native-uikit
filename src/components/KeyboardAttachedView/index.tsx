import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  KeyboardEvent,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useWindowDimensions,
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
    bottomContainerViewStyle,
  } = useInteraction();

  const {height, width} = useWindowDimensions();
  const deviceHeight = height - (StatusBar.currentHeight || 0);
  const [focused, setFocused] = useState(false);
  const [scrollViewHeight, setScrollViewHeight] = useState(0);

  const [showSoftInputOnFocus, setShowSoftInputOnFocus] = useState(true);

  useEffect(() => {}, []);

  return (
    <View
      style={[
        styles.container,
        {
          height: deviceHeight,
        },
        !visibleKeyboard && {
          position: 'absolute',
          bottom: 0,
        },
      ]}>
      <TouchableWithoutFeedback
        onPress={() => {
          handleBlur();
          focused && setFocused(false);
        }}>
        <Animated.ScrollView
          style={
            {
              // height: scrollViewHeight,
            }
          }>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n, i) => (
            <View
              key={i}
              style={{
                backgroundColor: '#fff',
                borderRadius: 8,
                padding: 20,
                marginVertical: 10,
                marginHorizontal: 10,
              }}>
              <Text style={{fontSize: 14}}>Hello! {i}</Text>
            </View>
          ))}
        </Animated.ScrollView>
      </TouchableWithoutFeedback>
      <Animated.View
        style={[{flexDirection: 'column'}]}
        onLayout={e => {
          if (scrollViewHeight === 0) {
            setScrollViewHeight(deviceHeight - e.nativeEvent.layout.height);
          }
        }}>
        <TouchableOpacity
          onPress={() => {
            console.log('pressed');
          }}
          style={[
            {
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: '#eee',
              width: '100%',
            },
          ]}>
          <TextInput
            style={{
              backgroundColor: '#fff',
            }}
            ref={textInputRef}
            placeholder="Enter input"
            showSoftInputOnFocus={showSoftInputOnFocus}
            onPressIn={() => {
              setShowSoftInputOnFocus(true);
              handleBlur();
              textInputRef.current?.focus();
              !focused && setFocused(true);
            }}
            onBlur={() => {
              // textInputRef.current?.focus();
            }}
          />
        </TouchableOpacity>
        {focused && (
          <View
            style={{
              flexDirection: 'row',
              borderBottomWidth: 1,
              borderBottomColor: '#fff',
              width: '100%',
              backgroundColor: '#fff',
            }}>
            {[1, 2, 3].map((n, i) => (
              <TouchableOpacity
                style={{
                  padding: 10,
                  backgroundColor: i === selectedIndex ? '#eee' : '#fff',
                }}
                key={i}
                onPress={() => {
                  setShowSoftInputOnFocus(selectedIndex === i);
                  handleActivateAddOn(i);
                }}>
                <Text>ADD ON {i}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        {focused && (
          <Animated.View
            style={[
              {backgroundColor: '#fff'},
              visibleAddOn && bottomContainerViewStyle,
              !visibleAddOn && {height: 'auto'},
            ]}
            onLayout={e => {
              console.log(
                'onLayout',
                visibleKeyboard,
                visibleAddOn,
                bottomContainerHeight.value,
              );
              if (visibleAddOn && bottomContainerHeight.value === 0) {
                bottomContainerHeight.value = e.nativeEvent.layout.height;
              }
            }}>
            {/* {!visibleKeyboard && visibleAddOn && ( */}
            <Animated.View
              style={[
                {justifyContent: 'center', alignItems: 'center'},
                addOnViewStyle,
              ]}>
              {[1, 2, 3].map((n, i) =>
                selectedIndex === i ? (
                  <View key={i}>
                    <Text>ADD ON - View - {i}</Text>
                  </View>
                ) : null,
              )}
            </Animated.View>
            {/* )} */}
          </Animated.View>
        )}
      </Animated.View>
    </View>
  );
};

export default KeyboardAttachedView;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: '100%',
    backgroundColor: '#eee',
  },
  bottomContainer: {
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
});
