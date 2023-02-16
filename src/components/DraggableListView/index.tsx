import _ from 'lodash';
import React, {useState} from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
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
  scrollVeiwMeasureState: {
    x: number;
    y: number;
    width: number;
    height: number;
    pageX: number;
    pageY: number;
  };
}

const ITEM_HEIGHT = 80;

const DraggableItem = ({
  scrollY,
  scrolling,
  positions,
  setPositions,
  id,
  totalCount,
  scrollVeiwMeasureState,
}: DraggableItemProps) => {
  const top = useSharedValue(positions.value[id] * ITEM_HEIGHT);

  // 움직이는 애니메이션 도중인 경우에는 컴포넌트의 Y 좌표를 변경하지 않도록 하기 위한 플래그
  const [moving, setMoving] = useState(false);

  // 애니메이션 실행 : 현재 컴포넌트의 순서가 변경될 때
  useAnimatedReaction(
    () => positions.value[id],
    (prev, current) => {
      // 현재 멈춰있고, 이전 값과 다른 경우에만 Y 좌표를 변경함
      if (!moving && prev !== current) {
        top.value = withTiming(positions.value[id] * ITEM_HEIGHT);
      }
    },
  );

  // useAnimatedStyle : 애니메이션을 위한 스타일을 선언해주기 위한 훅
  // 1) 스타일 : 높이 값이 변경되는 경우
  // 2) 움직이는중 / 멈춰있음 상태에 따라서 배경색 변경
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

  // 두 요소의 순서를 바꾼 후, 갱신된 포지션 스테이트를 [리턴한다]
  const moveItem = (from: number, to: number) => {
    // 새로운 객체로 인식하기 위해 Object.assion({}, prevObject)를 사용함
    const newItem = Object.assign({}, positions.value);

    // 모든 요소의 순서에 대한 데이터를 보관중인 positions.value 객체에서 [from <-> to] 두 순서를 바꿈
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

  // 두 요소의 순서를 바꾼 후, 갱신된 포지션 스테이트를 [반영한다]
  const updatePositions = (positionY: number) => {
    const _newPosition = Math.floor(positionY / ITEM_HEIGHT);
    const _minPosition = 0;
    const _maxPosition = totalCount - 1;

    const newLimitedPosition = _.clamp(
      _newPosition,
      _minPosition,
      _maxPosition,
    );

    const isChanged = newLimitedPosition !== positions.value[id];
    if (isChanged) {
      const prevPosition = positions.value[id];
      const nextPosition = newLimitedPosition;
      const newPositions = moveItem(prevPosition, nextPosition);
      setPositions(newPositions);
    }
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: () => {
      // 해당 요소를 터치하기 시작했다면 그 값을 반영해준다. (자바스크립트 스레드)
      runOnJS(setMoving)(true);
    },
    onActive: event => {
      const _dy_fromContainer = event.absoluteY - scrollVeiwMeasureState.pageY;
      const _dy_scroll = scrollY.value;
      const _dy_halfOfItem = ITEM_HEIGHT / 2;

      const positionY = _dy_fromContainer + _dy_scroll - _dy_halfOfItem;
      top.value = positionY;

      const isNotScrolling = !scrolling.value;
      if (isNotScrolling) {
        // Scroll Down
        const _scrollOffset = ITEM_HEIGHT;
        const scrollDownPoint =
          scrollVeiwMeasureState.height +
          scrollVeiwMeasureState.pageY -
          2.5 * _scrollOffset;
        if (_dy_fromContainer > scrollDownPoint) {
          scrolling.value = true;
          for (let i = 0; i < totalCount; i++) {
            scrollY.value = Math.min(
              scrollY.value + 1,
              ITEM_HEIGHT * totalCount - scrollVeiwMeasureState.height,
            );
          }
          scrolling.value = false;
        }
        // Scroll Up
        const scrollUpPoint = _scrollOffset;
        if (_dy_fromContainer < scrollUpPoint) {
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
      const dy = positions.value[id] * ITEM_HEIGHT;
      top.value = dy;
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
  const [scrollVeiwMeasureState, setScrollViewMeasureState] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    pageX: 0,
    pageY: 0,
  });
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

  const handleScroll = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  return (
    <GestureHandlerRootView style={styles.root}>
      <Animated.ScrollView
        onScroll={handleScroll}
        onLayout={e => {
          e.target.measure((x, y, width, height, pageX, pageY) => {
            setScrollViewMeasureState({x, y, width, height, pageX, pageY});
          });
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
            scrollVeiwMeasureState={scrollVeiwMeasureState}
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
