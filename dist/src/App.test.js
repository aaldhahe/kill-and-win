var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "react", "@testing-library/react", "./App"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var react_1 = __importDefault(require("react"));
    var react_2 = require("@testing-library/react");
    var App_1 = require("./App");
    test('renders learn react link', function () {
        var getByText = react_2.render(react_1.default.createElement(App_1.App, null)).getByText;
        var linkElement = getByText(/learn react/i);
        expect(linkElement).toBeInTheDocument();
    });
});
//# sourceMappingURL=App.test.js.map