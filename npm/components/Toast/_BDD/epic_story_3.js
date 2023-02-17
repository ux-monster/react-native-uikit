"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cucumber_1 = require("@cucumber/cucumber");
(0, cucumber_1.When)('the greeter says hello', function () { });
(0, cucumber_1.Then)('I should have heard {string}', function (expectedResponse) { });
