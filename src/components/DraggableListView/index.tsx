import _ from 'lodash';
import React, {useState} from 'react';
import {StatusBar, Text, useWindowDimensions, View} from 'react-native';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
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
    <GestureHandlerRootView style={{flex: 1, backgroundColor: '#fff'}}>
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
          backgroundColor: '#999',
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
