"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_2 = require("react-native");
var react_native_reanimated_1 = require("react-native-reanimated");
var react_native_gesture_handler_1 = require("react-native-gesture-handler");
var BottomSheet = function (_a) {
    var onClosed = _a.onClosed;
    var height = (0, react_native_1.useWindowDimensions)().height;
    var updateVisible = function () {
        onClosed();
    };
    var pressed = (0, react_native_reanimated_1.useSharedValue)(false);
    var endPosition = 0;
    var limitPosition = 70;
    var closePosition = (0, react_native_reanimated_1.useSharedValue)(1);
    var y = (0, react_native_reanimated_1.useSharedValue)(height);
    var eventHandler = (0, react_native_reanimated_1.useAnimatedGestureHandler)({
        onStart: function (event, ctx) {
            console.log('onStart');
            pressed.value = true;
        },
        onActive: function (event, ctx) {
            console.log('onActive');
            var _y = endPosition + event.translationY;
            if (_y >= 0) {
                y.value = _y;
            }
        },
        onEnd: function (event, ctx) {
            console.log('onEnd');
            pressed.value = false;
            var _y = endPosition + event.translationY;
            if (_y < limitPosition) {
                y.value = (0, react_native_reanimated_1.withTiming)(endPosition);
            }
            else {
                y.value = (0, react_native_reanimated_1.withTiming)(closePosition.value, undefined, function (isFinished) {
                    if (isFinished) {
                        (0, react_native_reanimated_1.runOnJS)(updateVisible)();
                    }
                });
            }
        },
    });
    var bottonContainerAnimatedStyle = (0, react_native_reanimated_1.useAnimatedStyle)(function () {
        return {
            backgroundColor: pressed.value ? '#fff' : '#fff',
            transform: [{ translateY: y.value }],
        };
    });
    var backgroundAnimatedStyle = (0, react_native_reanimated_1.useAnimatedStyle)(function () {
        return {
            opacity: 1 - Math.min(y.value / closePosition.value, 1),
        };
    });
    return (<react_native_2.View style={styles.container}>
      <react_native_reanimated_1.default.View style={[styles.background, backgroundAnimatedStyle]}/>
      <react_native_gesture_handler_1.GestureHandlerRootView style={{ flex: 1 }}>
        <react_native_1.TouchableOpacity style={{ flex: 1 }} onPress={function () {
            y.value = (0, react_native_reanimated_1.withTiming)(closePosition.value, undefined, function (isFinished) {
                if (isFinished) {
                    (0, react_native_reanimated_1.runOnJS)(updateVisible)();
                }
            });
        }}></react_native_1.TouchableOpacity>
        <react_native_reanimated_1.default.View onLayout={function (e) {
            var _height = e.nativeEvent.layout.height;
            if (_height > 0) {
                closePosition.value = _height;
                y.value = _height;
                y.value = (0, react_native_reanimated_1.withTiming)(0);
            }
        }} style={[styles.bottomContainer, bottonContainerAnimatedStyle]}>
          <react_native_gesture_handler_1.PanGestureHandler onGestureEvent={eventHandler}>
            <react_native_reanimated_1.default.View style={styles.barContainer}>
              <react_native_2.View style={styles.bar}></react_native_2.View>
            </react_native_reanimated_1.default.View>
          </react_native_gesture_handler_1.PanGestureHandler>
        </react_native_reanimated_1.default.View>
      </react_native_gesture_handler_1.GestureHandlerRootView>
    </react_native_2.View>);
};
exports.default = BottomSheet;
var styles = react_native_2.StyleSheet.create({
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
        height: 500,
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
