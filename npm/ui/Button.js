"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Text_1 = require("@/ui/Text");
var react_1 = require("react");
var react_native_1 = require("react-native");
var Button = function (props) {
    return (<react_native_1.default.TouchableHighlight {...props}>
      <Text_1.default>Button</Text_1.default>
    </react_native_1.default.TouchableHighlight>);
};
exports.default = Button;
