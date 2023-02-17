"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_2 = require("react-native");
var react_native_reanimated_1 = require("react-native-reanimated");
var react_native_gesture_handler_1 = require("react-native-gesture-handler");
var useInteraction_1 = require("./useInteraction");
var react_native_root_siblings_1 = require("react-native-root-siblings");
var BottomSheet = function (_a) {
    var children = _a.children, onClosed = _a.onClosed;
    var _b = (0, useInteraction_1.default)({ onClosed: onClosed }), animaatedStyles = _b[0], events = _b[1];
    return (<react_native_1.Modal style={styles.container} transparent>
      <react_native_reanimated_1.default.View style={[styles.background, animaatedStyles.background]}/>
      <react_native_gesture_handler_1.GestureHandlerRootView style={styles.gestureContainer}>
        <react_native_1.TouchableOpacity style={styles.backgroundTouchContainer} onPress={events.handleBackgroundClick}/>
        <react_native_reanimated_1.default.View style={[styles.bottomContainer, animaatedStyles.bottomContainer]} onLayout={events.handleBottomContainerRendering}>
          <react_native_gesture_handler_1.PanGestureHandler onGestureEvent={events.handleGesture}>
            <react_native_reanimated_1.default.View style={styles.barContainer}>
              <react_native_2.View style={styles.bar}/>
              <react_native_2.View>{children}</react_native_2.View>
            </react_native_reanimated_1.default.View>
          </react_native_gesture_handler_1.PanGestureHandler>
        </react_native_reanimated_1.default.View>
      </react_native_gesture_handler_1.GestureHandlerRootView>
    </react_native_1.Modal>);
};
var show = function (onClosed) {
    var component = new react_native_root_siblings_1.default((<BottomSheet onClosed={function () {
            component.destroy();
            onClosed();
        }}/>));
};
exports.default = Object.assign(BottomSheet, {
    show: show,
});
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
    gestureContainer: {
        flex: 1,
    },
    backgroundTouchContainer: {
        flex: 1,
    },
    bottomContainer: {
        backgroundColor: '#ffffff',
        marginTop: 'auto',
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
