import _ from 'lodash';
import React, {useState} from 'react';
import {StatusBar, Text, useWindowDimensions, View} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  SharedValue,
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const ITEM_HEIGHT = 80;
const sampleData = [
  {id: '1'},
  {id: '2'},
  {id: '3'},
  {id: '4'},
  {id: '5'},
  {id: '6'},
  {id: '7'},
  {id: '8'},
  {id: '9'},
  {id: '10'},
  {id: '11'},
  {id: '12'},
  {id: '13'},
  {id: '14'},
  {id: '15'},
  {id: '16'},
  {id: '17'},
  {id: '18'},
  {id: '19'},
  {id: '20'},
];

interface Props {
  scrollY: SharedValue<number>;
  scrolling: SharedValue<boolean>;
  positions: SharedValue<any>;
  setPositions: (value: SharedValue<any>) => void;
  id: string;
}

const DraggableItem = ({
  scrollY,
  scrolling,
  positions,
  setPositions,
  id,
}: Props) => {
  const dimensions = useWindowDimensions();
  const top = useSharedValue(positions.value[id] * ITEM_HEIGHT);
  const [moving, setMoving] = useState(false);

  useAnimatedReaction(
    () => positions.value[id],
    (prev, current) => {
      if (!moving && prev !== current) {
        top.value = withTiming(positions.value[id] * ITEM_HEIGHT);
      }
    },
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      left: 0,
      right: 0,
      top: top.value,
      backgroundColor: moving ? '#eee' : '#fff',
      zIndex: moving ? 100 : 0,
    };
  }, [moving]);

  const moveItem = (from: number, to: number) => {
    const newItem = Object.assign({}, positions.value);
    for (const id in positions.value) {
      if (positions.value[id] === from) {
        newItem[id] = to;
      }
      if (positions.value[id] === to) {
        newItem[id] = from;
      }
    }
    return newItem;
  };

  const updatePositions = (positionY: number) => {
    const newPosition = _.clamp(
      Math.floor((positionY - ITEM_HEIGHT / 2) / ITEM_HEIGHT),
      0,
      sampleData.length - 1,
    );
    if (newPosition !== positions.value[id]) {
      const newPositions = moveItem(positions.value[id], newPosition);
      setPositions(newPositions);
    }
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: () => {
      runOnJS(setMoving)(true);
    },
    onActive: event => {
      const positionY = event.absoluteY + scrollY.value + 40;
      top.value = positionY - ITEM_HEIGHT;
      if (!scrolling.value) {
        // Scroll Down
        if (
          event.absoluteY + ITEM_HEIGHT >
          dimensions.height - (StatusBar.currentHeight || 0)
        ) {
          scrolling.value = true;
          for (let i = 0; i < sampleData.length; i++) {
            scrollY.value = Math.min(
              scrollY.value + 1,
              ITEM_HEIGHT * sampleData.length - dimensions.height + 40,
            );
          }
          scrolling.value = false;
        }
        // Scroll Up
        if (event.absoluteY - ITEM_HEIGHT < 0) {
          scrolling.value = true;
          for (let i = 0; i < sampleData.length; i++) {
            scrollY.value = Math.max(scrollY.value - 1, 0);
          }
          scrolling.value = false;
        }
      }
      runOnJS(updatePositions)(positionY);
    },
    onFinish: () => {
      top.value = positions.value[id] * ITEM_HEIGHT;
      runOnJS(setMoving)(false);
    },
  });

  return (
    <Animated.View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          borderColor: '#eee',
          borderTopWidth: 1,
          borderBottomWidth: 1,
          backgroundColor: '#fff',
        },
        animatedStyle,
      ]}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View
          style={{
            height: ITEM_HEIGHT,
            width: ITEM_HEIGHT,
            backgroundColor: '#f2f2f2',
          }}></Animated.View>
      </PanGestureHandler>
      <View
        style={{
          height: ITEM_HEIGHT,
          flexDirection: 'row',
          alignItems: 'center',
          flex: 1,
        }}>
        <Text style={{fontSize: 20, paddingLeft: 30}}>Draggable Item {id}</Text>
      </View>
    </Animated.View>
  );
};

export default DraggableItem;
