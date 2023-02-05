import React from 'react';
import {LayoutChangeEvent, useWindowDimensions} from 'react-native';
import {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  onClosed: () => void;
};

export default function useInteraction({onClosed}: Props) {
  const {height} = useWindowDimensions();
  const updateVisible = () => {
    onClosed();
  };

  const pressed = useSharedValue(false);
  const endPosition = 0;
  const limitPosition = 70;
  const closePosition = useSharedValue(1);
  const y = useSharedValue(height);

  const handleGesture = useAnimatedGestureHandler({
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

  const bottomContainer = useAnimatedStyle(() => {
    return {
      backgroundColor: pressed.value ? '#fff' : '#fff',
      transform: [{translateY: y.value}],
    };
  });

  const background = useAnimatedStyle(() => {
    return {
      opacity: 1 - Math.min(y.value / closePosition.value, 1),
    };
  });

  const handleBackgroundClick = () => {
    y.value = withTiming(closePosition.value, undefined, isFinished => {
      if (isFinished) {
        runOnJS(updateVisible)();
      }
    });
  };

  const handleContainerRendering = (e: LayoutChangeEvent) => {
    const _height = e.nativeEvent.layout.height;
    if (_height > 0) {
      closePosition.value = _height;
      y.value = _height;
      y.value = withTiming(0);
    }
  };

  return [
    {bottomContainer, background}, // animaatedStyles
    {handleGesture, handleBackgroundClick, handleContainerRendering}, // events
  ];
}
