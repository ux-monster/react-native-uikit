"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_root_siblings_1 = require("react-native-root-siblings");
var Toast = function (_a) {
    var message = _a.message, duration = _a.duration, type = _a.type, onDestroy = _a.onDestroy;
    var _b = (0, react_native_1.useWindowDimensions)(), deviceWidth = _b.width, deviceHeight = _b.height;
    var _c = (0, react_1.useState)({
        width: 0,
        height: 0,
    }), size = _c[0], setSize = _c[1];
    var styles = createStyles((deviceHeight - (react_native_1.StatusBar.currentHeight || 0) - size.height) / 2, (deviceWidth - size.width) / 2);
    var origin = (0, react_1.useRef)(new react_native_1.Animated.Value(0)).current;
    var opacity = origin.interpolate({
        inputRange: [0, 0.1, 0.9, 1],
        outputRange: [0, 1, 1, 0],
    });
    (0, react_1.useEffect)(function () {
        react_native_1.Animated.timing(origin, {
            toValue: 1,
            useNativeDriver: false,
            duration: duration,
        }).start(function () {
            onDestroy();
        });
    }, [origin, duration, onDestroy]);
    return (<react_native_1.Animated.View style={[
            styles.container,
            type === 'top' && styles.containerTop,
            type === 'middle' && styles.containerMiddle,
            type === 'bottom' && styles.containerBottom,
            { opacity: opacity },
        ]} onLayout={function (e) {
            return setSize({
                height: e.nativeEvent.layout.height,
                width: e.nativeEvent.layout.width,
            });
        }}>
      <react_native_1.Text style={styles.message}>{message}</react_native_1.Text>
    </react_native_1.Animated.View>);
};
var show = function (message, duration, type, onDestroy) {
    var component = new react_native_root_siblings_1.default((<Toast message={message} duration={duration || 3000} type={type || 'top'} onDestroy={function () {
            component.destroy();
            onDestroy && onDestroy();
        }}/>));
};
exports.default = Object.assign(Toast, { show: show });
var createStyles = function (top, left) {
    return react_native_1.StyleSheet.create({
        container: {
            position: 'absolute',
            backgroundColor: 'rgba(0,0,0,0.7)',
            borderRadius: 20,
            paddingVertical: 10,
            paddingHorizontal: 15,
        },
        containerTop: {
            top: 50 - (react_native_1.StatusBar.currentHeight || 0),
            left: left,
        },
        containerMiddle: {
            top: top,
            left: left,
        },
        containerBottom: {
            bottom: 70,
            left: left,
        },
        message: {
            fontSize: 16,
            color: '#fff',
        },
    });
};
