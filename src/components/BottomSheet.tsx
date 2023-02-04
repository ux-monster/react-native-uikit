import React from 'react';
import {TouchableOpacity, useWindowDimensions} from 'react-native';
import {StyleSheet, View} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';

type Props = {
  onClosed: () => void;
};

const BottomSheet = ({onClosed}: Props) => {
  const {height} = useWindowDimensions();
  const updateVisible = () => {
    onClosed();
  };

  const pressed = useSharedValue(false);
  const endPosition = 0;
  const limitPosition = 70;
  const closePosition = useSharedValue(1);
  const y = useSharedValue(height);

  const eventHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      console.log('onStart');
      pressed.value = true;
    },
    onActive: (event, ctx) => {
      console.log('onActive');
      const _y = endPosition + event.translationY;
      if (_y >= 0) {
        y.value = _y;
      }
    },
    onEnd: (event, ctx) => {
      console.log('onEnd');
      pressed.value = false;
      const _y = endPosition + event.translationY;
      if (_y < limitPosition) {
        y.value = withTiming(endPosition);
      } else {
        y.value = withTiming(closePosition.value, undefined, isFinished => {
          if (isFinished) {
            runOnJS(updateVisible)();
          }
        });
      }
    },
  });

  const bottonContainerAnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: pressed.value ? '#fff' : '#fff',
      transform: [{translateY: y.value}],
    };
  });

  const backgroundAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: 1 - Math.min(y.value / closePosition.value, 1),
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.background, backgroundAnimatedStyle]} />
      <GestureHandlerRootView style={{flex: 1}}>
        <TouchableOpacity
          style={{flex: 1}}
          onPress={() => {
            y.value = withTiming(closePosition.value, undefined, isFinished => {
              if (isFinished) {
                runOnJS(updateVisible)();
              }
            });
          }}></TouchableOpacity>
        <Animated.View
          onLayout={e => {
            const _height = e.nativeEvent.layout.height;
            if (_height > 0) {
              closePosition.value = _height;
              y.value = _height;
              y.value = withTiming(0);
            }
          }}
          style={[styles.bottomContainer, bottonContainerAnimatedStyle]}>
          <PanGestureHandler onGestureEvent={eventHandler}>
            <Animated.View style={styles.barContainer}>
              <View style={styles.bar}></View>
            </Animated.View>
          </PanGestureHandler>
        </Animated.View>
      </GestureHandlerRootView>
    </View>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    flexDirection: 'column',
  },
  background: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: -1,
  },
  bottomContainer: {
    backgroundColor: '#ffffff',
    marginTop: 'auto',
    height: 500, // TODO - Remove
    borderRadius: 32,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  barContainer: {
    paddingVertical: 20,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  bar: {
    backgroundColor: '#dfdfdf',
    borderRadius: 20,
    width: '25%',
    height: 4,
  },
});
