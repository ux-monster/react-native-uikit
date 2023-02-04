"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var RN = require("react-native");
var TextInput = function (_a) {
    var value = _a.value, onChangeText = _a.onChangeText;
    return <RN.TextInput value={value} onChangeText={onChangeText}/>;
};
exports.default = TextInput;
