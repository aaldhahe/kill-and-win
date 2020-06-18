"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
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
//# sourceMappingURL=Connection.js.map