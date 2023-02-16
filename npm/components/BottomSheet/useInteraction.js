"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var react_native_reanimated_1 = require("react-native-reanimated");
function useInteraction(_a) {
    var onClosed = _a.onClosed;
    var height = (0, react_native_1.useWindowDimensions)().height;
    var pressed = (0, react_native_reanimated_1.useSharedValue)(false);
    var endPosition = 0;
    var limitPosition = 70;
    var closePosition = (0, react_native_reanimated_1.useSharedValue)(1);
    var y = (0, react_native_reanimated_1.useSharedValue)(height);
    var updateVisible = function () {
        onClosed();
    };
    var background = (0, react_native_reanimated_1.useAnimatedStyle)(function () {
        return {
            opacity: 1 - Math.min(y.value / closePosition.value, 1),
        };
    });
    var bottomContainer = (0, react_native_reanimated_1.useAnimatedStyle)(function () {
        return {
            backgroundColor: pressed.value ? '#fff' : '#fff',
            transform: [{ translateY: y.value }],
        };
    });
    var handleGesture = (0, react_native_reanimated_1.useAnimatedGestureHandler)({
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
    var handleBackgroundClick = function () {
        y.value = (0, react_native_reanimated_1.withTiming)(closePosition.value, undefined, function (isFinished) {
            if (isFinished) {
                (0, react_native_reanimated_1.runOnJS)(updateVisible)();
            }
        });
    };
    var handleBottomContainerRendering = function (e) {
        var _height = e.nativeEvent.layout.height;
        if (_height > 0) {
            closePosition.value = _height;
            y.value = _height;
            y.value = (0, react_native_reanimated_1.withTiming)(0);
        }
    };
    return [
        { bottomContainer: bottomContainer, background: background },
        { handleGesture: handleGesture, handleBackgroundClick: handleBackgroundClick, handleBottomContainerRendering: handleBottomContainerRendering },
    ];
}
exports.default = useInteraction;
