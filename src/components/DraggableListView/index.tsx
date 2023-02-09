import _ from 'lodash';
import React, {useEffect, useRef, useState} from 'react';
import {
  StatusBar,
  Text,
  TouchableHighlight,
  useWindowDimensions,
} from 'react-native';
import {
  GestureHandlerRootView,
  HandlerStateChangeEvent,
  LongPressGestureHandler,
  LongPressGestureHandlerEventPayload,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
  State,
} from 'react-native-gesture-handler';
import Animated, {
  cancelAnimation,
  runOnJS,
  scrollTo,
  SharedValue,
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface DraggableItemProps {
  scrollY: SharedValue<number>;
  scrolling: SharedValue<boolean>;
  positions: SharedValue<any>;
  setPositions: (value: SharedValue<any>) => void;
  id: string;
}

const itemCount = 16;
const ITEM_HEIGHT = 80;
const SCROLL_HEIGHT_THRESHOLD = ITEM_HEIGHT;

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

const DraggableItem = ({
  scrollY,
  scrolling,
  positions,
  setPositions,
  id,
}: DraggableItemProps) => {
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
      backgroundColor: moving ? 'green' : 'yellow',
      zIndex: moving ? 100 : 0,
    };
  }, [moving]);

  const moveItem = (from: number, to: number) => {
    const newItem = Object.assign({}, positions.value);
    console.log(
      'moveItem - positionsValue',
      positions.value,
      positions.value[id],
    );
    // console.log('이전', positions.value);
    for (const id in positions.value) {
      if (positions.value[id] === from) {
        newItem[id] = to;
      }
      if (positions.value[id] === to) {
        newItem[id] = from;
      }
    }
    // console.log('이후', newItem);
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

  let timer = null;

  const gestureHandler = useAnimatedGestureHandler({
    onStart: () => {
      console.log('onStart');
      runOnJS(setMoving)(true);
    },
    onActive: event => {
      // console.log('onActive');
      const positionY = event.absoluteY + scrollY.value + 40;
      // cancelAnimation(scrollY);
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
      console.log('positionY - ITEM_HEIGHT', positionY - ITEM_HEIGHT);
    },
    onFinish: () => {
      top.value = positions.value[id] * ITEM_HEIGHT;
      runOnJS(setMoving)(false);
    },
  });

  return (
    <Animated.View style={[{backgroundColor: 'aqua'}, animatedStyle]}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={{height: ITEM_HEIGHT}}>
          <Text style={{fontSize: 20}}>Draggable Item {id}</Text>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

const DraggableListView = () => {
  const scrolling = useSharedValue(false);
  const scrollY = useSharedValue(0);
  const positions = useSharedValue(listToObject(sampleData));
  const scrollViewRef = useAnimatedRef<Animated.ScrollView>();

  useAnimatedReaction(
    () => scrollY.value,
    scrolling => scrollTo(scrollViewRef, 0, scrolling, false),
  );

  const handleScroll = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  function listToObject<T>(list: Array<T>) {
    const values: any = Object.values(list);
    const object: any = {};
    for (let i = 0; i < values.length; i++) {
      object[values[i].id] = i;
    }
    return object;
  }

  return (
    <GestureHandlerRootView style={{flex: 1, backgroundColor: 'pink'}}>
      <Animated.ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={{
          flex: 1,
          position: 'relative',
          backgroundColor: 'white',
        }}
        contentContainerStyle={{
          height: ITEM_HEIGHT * sampleData.length,
          backgroundColor: 'pink',
        }}>
        {sampleData.map((o, key) => (
          <DraggableItem
            key={key}
            id={o.id}
            scrollY={scrollY}
            scrolling={scrolling}
            positions={positions}
            setPositions={newPositions => {
              positions.value = newPositions;
            }}
          />
        ))}
      </Animated.ScrollView>
    </GestureHandlerRootView>
  );
};

export default DraggableListView;
