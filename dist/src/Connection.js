var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "socket.io-client"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Connection = void 0;
    var socket_io_client_1 = __importDefault(require("socket.io-client"));
    var Connection = /** @class */ (function () {
        function Connection(endpoint) {
            this.endpoint = endpoint;
        }
        Connection.prototype.client = function () {
            return socket_io_client_1.default(this.endpoint);
        };
        return Connection;
    }());
    exports.Connection = Connection;
});
//# sourceMappingURL=Connection.js.map