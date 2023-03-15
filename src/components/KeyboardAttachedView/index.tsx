import React, {useState} from 'react';
import {
  Keyboard,
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
import Animated from 'react-native-reanimated';
import useInteraction from './useInteraction';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

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
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={[
        styles.container,
        {
          height: deviceHeight,
        },
        !visibleKeyboard && styles.absoluteContainer,
      ]}>
      <TouchableWithoutFeedback>
        <Animated.ScrollView keyboardShouldPersistTaps="handled">
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              Keyboard.dismiss();
              handleBlur();
              focused && setFocused(false);
            }}>
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
          </TouchableOpacity>
        </Animated.ScrollView>
      </TouchableWithoutFeedback>
      <View
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
          style={[styles.textInputContainer]}>
          <TextInput
            returnKeyType="send"
            onSubmitEditing={() => {
              Keyboard.dismiss();
              handleBlur();
              focused && setFocused(false);
            }}
            style={[
              styles.textInput,
              Platform.OS === 'ios' && styles.textInputIOS,
            ]}
            ref={textInputRef}
            placeholder="Enter input"
            showSoftInputOnFocus={showSoftInputOnFocus}
            onPressIn={() => {
              setShowSoftInputOnFocus(true);
              handleBlur();
              setTimeout(() => {
                if (Platform.OS === 'ios') {
                  Keyboard.dismiss();
                }
                textInputRef.current?.focus();
              }, 200);
              !focused && setFocused(true);
            }}
            onBlur={() => {
              // textInputRef.current?.focus();
            }}
          />
        </TouchableOpacity>
        {!focused && (
          <View style={[{height: insets.bottom}, styles.bottomSpace]} />
        )}
        {focused && (
          <View style={styles.addOnTabContainer}>
            {[1, 2, 3].map((n, i) => (
              <TouchableOpacity
                style={[
                  styles.addOnTab,
                  {
                    backgroundColor: i === selectedIndex ? '#eee' : '#fff',
                  },
                ]}
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
              styles.addOnViewContainer,
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
            <Animated.View style={[styles.addOnView, addOnViewStyle]}>
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
      </View>
    </SafeAreaView>
  );
};

export default KeyboardAttachedView;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#eee',
  },
  absoluteContainer: {
    position: 'absolute',
    bottom: 0,
  },
  textInputContainer: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
    width: '100%',
    backgroundColor: '#fff',
  },
  textInput: {
    backgroundColor: '#fff',
  },
  textInputIOS: {
    padding: 10,
    fontSize: 16,
  },
  bottomSpace: {
    backgroundColor: '#fff',
  },
  addOnTabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    width: '100%',
    backgroundColor: '#fff',
  },
  addOnTab: {
    padding: 10,
  },
  addOnViewContainer: {
    backgroundColor: '#fff',
  },
  addOnView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
