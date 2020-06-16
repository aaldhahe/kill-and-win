// import React from 'react';
// import ReactDOM from 'react-dom';
// import './views/index.css';
// import { App, SocketIoEx } from './App';
// import * as serviceWorker from './serviceWorker';
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Connection"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.onload = exports.init = void 0;
    // ReactDOM.render(
    //   <React.StrictMode>
    //     <App />
    //     <SocketIoEx />
    //   </React.StrictMode>,
    //   document.getElementById('root')
    // );
    // // If you want your app to work offline and load faster, you can change
    // // unregister() to register() below. Note this comes with some pitfalls.
    // // Learn more about service workers: https://bit.ly/CRA-PWA
    // serviceWorker.unregister();
    // import { onload } from './Alert';
    var Connection_1 = require("./Connection");
    var endpoint = "http://127.0.0.1:" + (process.env.PORT || 8080);
    var playerName = onload();
    var socket = new Connection_1.Connection(endpoint).client();
    function init() {
        var element = document.getElementById("body");
        element.value = "Ahmed testing inside getElementById body";
    }
    exports.init = init;
    // const element = document.getElementById("body") as HTMLInputElement;
    // element.value = "Ahmed testing inside getElementById body";
    var interval = setInterval(function () { return api("" + playerName); }, 2000);
    var api = function (message) {
        socket.emit('ahmed', message);
    };
    function onload() {
        return prompt("What is your name?", "");
    }
    exports.onload = onload;
});
//# sourceMappingURL=index.js.map