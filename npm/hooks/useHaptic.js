"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var useHaptic = function () {
    var ReactNativeHapticFeedback = require('react-native-haptic-feedback');
    var options = {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: false,
    };
    var haptic = function () {
        ReactNativeHapticFeedback.trigger('impactLight', options);
    };
    return haptic;
};
exports.default = useHaptic;
