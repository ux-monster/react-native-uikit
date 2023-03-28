import React, {useState} from 'react';
import {Gesture} from 'react-native-gesture-handler';
import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

interface Props {
  rootState: boolean;
}

const useInteraction = ({rootState}: Props) => {
  // State
  const [pressed, setPressed] = useState<boolean>(false);
  const [moving, setMoving] = useState<boolean>(false);

  // Animated State
  const position = useSharedValue<number>(0);

  // Animated Style
  const animatedStyle = useAnimatedStyle(() => {
    return {
      color: rootState ? '#fff' : '#000',
    };
  }, [rootState]);

  // Gesture Handler - with Animated.View
  const panGestureHandler = Gesture.Pan()
    .activateAfterLongPress(3000)
    .onTouchesDown(() => {
      console.log('Touch! and waiting 3s ...');
      runOnJS(setPressed)(true);
    })
    .onTouchesUp(() => {
      runOnJS(setPressed)(false);
    })
    .onTouchesCancelled(() => {
      runOnJS(setPressed)(false);
    })
    .onStart(() => {
      runOnJS(setMoving)(true);
    })
    .onUpdate(event => {
      // const _dy_fromContainer = event.absoluteY - scrollViewMeasureState.pageY;
      // const _dy_scroll = scrollY.value;
      // const _dy_halfOfItem = ITEM_HEIGHT / 2;
    })
    .onEnd(() => {});

  // Event Handler Interaction - onChange, onPress, onBlur ...
  const eventHandlerInteraction = () => {};

  return {
    animatedStyle,
    panGestureHandler,
    eventHandlerInteraction,
  };
};

export default useInteraction;
