var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "express", "path", "http", "socket.io"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var express_1 = __importDefault(require("express"));
    var path_1 = __importDefault(require("path"));
    var http_1 = __importDefault(require("http"));
    var socket_io_1 = __importDefault(require("socket.io"));
    var app = express_1.default();
    var port = process.env.PORT || 8080; // default port to listen
    var NODE_ENV = process.env.NODE_ENV;
    var serveApp = NODE_ENV === 'development' ? '../dist/src' : './';
    var interval;
    app.use(express_1.default.static(path_1.default.join(__dirname, serveApp)));
    app.get('/', function (req, res) {
        res.sendFile(path_1.default.join(__dirname, serveApp + "/views", 'index.html'));
    });
    var server = http_1.default.createServer(app);
    var io = socket_io_1.default(server);
    // start the Express server
    server.listen(port, function () {
        console.log("server started at http://localhost:" + port);
    });
    io.on("connection", function (socket) {
        console.log("a user connected");
        if (interval) {
            clearInterval(interval);
        }
        interval = setInterval(function () { return getApiAndEmit(socket); }, 5000);
        socket.on("ahmed", function (message) {
            console.log("Printing ahmed message " + message);
        });
    });
    var getApiAndEmit = function (socket) {
        var response = new Date();
        socket.emit('api', response);
    };
});
//# sourceMappingURL=server.js.map