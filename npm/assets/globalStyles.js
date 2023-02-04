"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wp = exports.hp = exports.basicDimensions = exports.fonts = exports.colors = void 0;
var react_native_1 = require("react-native");
var react_native_device_info_1 = require("react-native-device-info");
exports.colors = {
    primary: '#EC8B57',
    black: '#191919',
    red: '#FF3636',
    lightBlue: '#36D2FF',
    green: '#8FEF73',
    grey: '#767676',
    borderGrey: '#C9C9C9',
    statusGrey: '#666666',
    textGrey: '#A2A2A2',
    darkBlue: '#83abeb',
};
exports.fonts = {
    noto_sans_kr: {
        thin: 'NotoSansKR-Thin',
        light: 'NotoSansKR-Light',
        medium: 'NotoSansKR-Medium',
        regular: 'NotoSansKR-Regular',
        bold: 'NotoSansKR-Bold',
        black: 'NotoSansKR-Black',
    },
    roboto: {
        thin: 'Roboto-Thin',
        light: 'Roboto-Light',
        medium: 'Roboto-Medium',
        regular: 'Roboto-Regular',
        bold: 'Roboto-Bold',
    },
};
exports.basicDimensions = {
    height: 900,
    width: 360,
};
var hp = function (mobileValue, tabletValue) {
    var value = (0, react_native_device_info_1.isTablet)() && tabletValue ? tabletValue : mobileValue;
    return Math.floor(react_native_1.Dimensions.get('screen').height * (1 / exports.basicDimensions.height) * value);
};
exports.hp = hp;
var wp = function (mobileValue, tabletValue) {
    var value = (0, react_native_device_info_1.isTablet)() && tabletValue ? tabletValue : mobileValue;
    return Math.floor(react_native_1.Dimensions.get('screen').width * (1 / exports.basicDimensions.width) * value);
};
exports.wp = wp;
