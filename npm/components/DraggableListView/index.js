"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_gesture_handler_1 = require("react-native-gesture-handler");
var react_native_reanimated_1 = require("react-native-reanimated");
var ITEM_HEIGHT = 80;
var DraggableItem = function (_a) {
    var scrollY = _a.scrollY, scrolling = _a.scrolling, positions = _a.positions, setPositions = _a.setPositions, id = _a.id, totalCount = _a.totalCount, scrollVeiwMeasureState = _a.scrollVeiwMeasureState;
    var top = (0, react_native_reanimated_1.useSharedValue)(positions.value[id] * ITEM_HEIGHT);
    var _b = (0, react_1.useState)(false), moving = _b[0], setMoving = _b[1];
    (0, react_native_reanimated_1.useAnimatedReaction)(function () { return positions.value[id]; }, function (prev, current) {
        if (!moving && prev !== current) {
            top.value = (0, react_native_reanimated_1.withTiming)(positions.value[id] * ITEM_HEIGHT);
        }
    });
    var animatedStyle = (0, react_native_reanimated_1.useAnimatedStyle)(function () {
        return {
            position: 'absolute',
            left: 0,
            right: 0,
            top: top.value,
            backgroundColor: moving ? '#eee' : '#fff',
            zIndex: moving ? 100 : 0,
        };
    }, [moving]);
    var moveItem = function (from, to) {
        var newItem = Object.assign({}, positions.value);
        for (var _id in positions.value) {
            if (positions.value[_id] === from) {
                newItem[_id] = to;
            }
            if (positions.value[_id] === to) {
                newItem[_id] = from;
            }
        }
        return newItem;
    };
    var updatePositions = function (positionY) {
        var _newPosition = Math.floor(positionY / ITEM_HEIGHT);
        var _minPosition = 0;
        var _maxPosition = totalCount - 1;
        var newLimitedPosition = lodash_1.default.clamp(_newPosition, _minPosition, _maxPosition);
        var isChanged = newLimitedPosition !== positions.value[id];
        if (isChanged) {
            var prevPosition = positions.value[id];
            var nextPosition = newLimitedPosition;
            var newPositions = moveItem(prevPosition, nextPosition);
            setPositions(newPositions);
        }
    };
    var gestureHandler = (0, react_native_reanimated_1.useAnimatedGestureHandler)({
        onStart: function () {
            (0, react_native_reanimated_1.runOnJS)(setMoving)(true);
        },
        onActive: function (event) {
            var _dy_fromContainer = event.absoluteY - scrollVeiwMeasureState.pageY;
            var _dy_scroll = scrollY.value;
            var _dy_halfOfItem = ITEM_HEIGHT / 2;
            var positionY = _dy_fromContainer + _dy_scroll - _dy_halfOfItem;
            top.value = positionY;
            var isNotScrolling = !scrolling.value;
            if (isNotScrolling) {
                var _scrollOffset = ITEM_HEIGHT;
                var scrollDownPoint = scrollVeiwMeasureState.height +
                    scrollVeiwMeasureState.pageY -
                    _scrollOffset -
                    (react_native_1.StatusBar.currentHeight || 0);
                if (_dy_fromContainer > scrollDownPoint) {
                    scrolling.value = true;
                    for (var i = 0; i < totalCount; i++) {
                        scrollY.value = Math.min(scrollY.value + 1, ITEM_HEIGHT * totalCount - scrollVeiwMeasureState.height);
                    }
                    scrolling.value = false;
                }
                var scrollUpPoint = ITEM_HEIGHT;
                if (_dy_fromContainer < scrollUpPoint) {
                    scrolling.value = true;
                    for (var i = 0; i < totalCount; i++) {
                        scrollY.value = Math.max(scrollY.value - 1, 0);
                    }
                    scrolling.value = false;
                }
            }
            (0, react_native_reanimated_1.runOnJS)(updatePositions)(positionY);
        },
        onFinish: function () {
            var dy = positions.value[id] * ITEM_HEIGHT;
            top.value = dy;
            (0, react_native_reanimated_1.runOnJS)(setMoving)(false);
        },
    });
    return (<react_native_reanimated_1.default.View style={[
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
      <react_native_gesture_handler_1.PanGestureHandler onGestureEvent={gestureHandler}>
        <react_native_reanimated_1.default.View style={{
            height: ITEM_HEIGHT,
            width: ITEM_HEIGHT,
            backgroundColor: '#f2f2f2',
        }}/>
      </react_native_gesture_handler_1.PanGestureHandler>
      <react_native_1.View style={{
            height: ITEM_HEIGHT,
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
        }}>
        <react_native_1.Text style={{ fontSize: 20, paddingLeft: 30 }}>Draggable Item {id}</react_native_1.Text>
      </react_native_1.View>
    </react_native_reanimated_1.default.View>);
};
var DraggableListView = function (_a) {
    var items = _a.items;
    var _b = (0, react_1.useState)({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        pageX: 0,
        pageY: 0,
    }), scrollVeiwMeasureState = _b[0], setScrollViewMeasureState = _b[1];
    var scrolling = (0, react_native_reanimated_1.useSharedValue)(false);
    var scrollY = (0, react_native_reanimated_1.useSharedValue)(0);
    var positions = (0, react_native_reanimated_1.useSharedValue)(listToObject(items));
    var scrollViewRef = (0, react_native_reanimated_1.useAnimatedRef)();
    (0, react_native_reanimated_1.useAnimatedReaction)(function () { return scrollY.value; }, function (_scrolling) { return (0, react_native_reanimated_1.scrollTo)(scrollViewRef, 0, _scrolling, false); });
    function listToObject(list) {
        var values = Object.values(list);
        var object = {};
        for (var i = 0; i < values.length; i++) {
            object[values[i].id] = i;
        }
        return object;
    }
    return (<react_native_gesture_handler_1.GestureHandlerRootView style={styles.root}>
      <react_native_reanimated_1.default.ScrollView onLayout={function (e) {
            e.target.measure(function (x, y, width, height, pageX, pageY) {
                setScrollViewMeasureState({ x: x, y: y, width: width, height: height, pageX: pageX, pageY: pageY });
            });
        }} ref={scrollViewRef} scrollEventThrottle={16} style={styles.scrollView} contentContainerStyle={[
            styles.scrollViewContainer,
            {
                height: ITEM_HEIGHT * items.length,
            },
        ]}>
        {items.map(function (o, key) { return (<DraggableItem key={key} id={o.id} scrollY={scrollY} scrolling={scrolling} positions={positions} setPositions={function (newPositions) {
                positions.value = newPositions;
            }} totalCount={items.length} scrollVeiwMeasureState={scrollVeiwMeasureState}/>); })}
      </react_native_reanimated_1.default.ScrollView>
    </react_native_gesture_handler_1.GestureHandlerRootView>);
};
exports.default = DraggableListView;
var styles = react_native_1.StyleSheet.create({
    root: { flex: 1, backgroundColor: '#fff' },
    scrollView: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollViewContainer: {
        position: 'relative',
    },
});
