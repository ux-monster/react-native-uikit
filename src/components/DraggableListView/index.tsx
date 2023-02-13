import _ from 'lodash';
import React, {useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
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
  totalCount: number;
  rootHeight: number;
}

const ITEM_HEIGHT = 80;

const DraggableItem = ({
  scrollY,
  scrolling,
  positions,
  setPositions,
  id,
  totalCount,
  rootHeight,
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
    for (const _id in positions.value) {
      if (positions.value[_id] === from) {
        newItem[_id] = to;
      }
      if (positions.value[_id] === to) {
        newItem[_id] = from;
      }
    }
    return newItem;
  };

  const updatePositions = (positionY: number) => {
    const newPosition = _.clamp(
      Math.floor((positionY - ITEM_HEIGHT / 2) / ITEM_HEIGHT),
      0,
      totalCount - 1,
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
          for (let i = 0; i < totalCount; i++) {
            scrollY.value = Math.min(
              scrollY.value + 1,
              ITEM_HEIGHT * totalCount - dimensions.height + 40,
            );
          }
          scrolling.value = false;
        }
        // Scroll Up
        if (event.absoluteY - ITEM_HEIGHT < 0) {
          scrolling.value = true;
          for (let i = 0; i < totalCount; i++) {
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
          }}
        />
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

interface DraggableListViewProps {
  items: Array<any>;
}

const DraggableListView = ({items}: DraggableListViewProps) => {
  const [rootHeight, setRootHeight] = useState<number>(0);
  const scrolling = useSharedValue(false);
  const scrollY = useSharedValue(0);
  const positions = useSharedValue(listToObject(items));
  const scrollViewRef = useAnimatedRef<Animated.ScrollView>();

  // When: Changed `scrollY.value = 'dy'`
  // Then: Scroll to 'dy'
  useAnimatedReaction(
    () => scrollY.value,
    _scrolling => scrollTo(scrollViewRef, 0, _scrolling, false),
  );

  function listToObject<T>(list: Array<T>) {
    const values: any = Object.values(list);
    const object: any = {};
    for (let i = 0; i < values.length; i++) {
      object[values[i].id] = i;
    }
    return object;
  }

  return (
    <GestureHandlerRootView style={styles.root}>
      <Animated.ScrollView
        onLayout={e => {
          const height = e.nativeEvent.layout.height;
          height > 0 && setRootHeight(e.nativeEvent.layout.height);
        }}
        ref={scrollViewRef}
        scrollEventThrottle={16}
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollViewContainer,
          {
            height: ITEM_HEIGHT * items.length,
          },
        ]}>
        {items.map((o, key) => (
          <DraggableItem
            key={key}
            id={o.id}
            scrollY={scrollY}
            scrolling={scrolling}
            positions={positions}
            setPositions={newPositions => {
              positions.value = newPositions;
            }}
            totalCount={items.length}
            rootHeight={rootHeight}
          />
        ))}
      </Animated.ScrollView>
    </GestureHandlerRootView>
  );
};

export default DraggableListView;

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: '#fff'},
  scrollView: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollViewContainer: {
    position: 'relative',
  },
});
