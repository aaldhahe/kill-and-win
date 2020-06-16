var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "react", "./logo.svg", "./views/App.css", "socket.io-client"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.App = void 0;
    var react_1 = __importDefault(require("react"));
    var logo_svg_1 = __importDefault(require("./logo.svg"));
    require("./views/App.css");
    var socket_io_client_1 = __importDefault(require("socket.io-client"));
    var endpoint = "http://127.0.0.1:" + (process.env.PORT || 8080);
    var socket = socket_io_client_1.default(endpoint);
    var interval;
    function App() {
        // if (interval) {
        //   clearInterval(interval);
        // }
        // interval = setInterval(() => ahmed('this is a testing message'), 1000);
        return (react_1.default.createElement("div", { className: "App" },
            react_1.default.createElement("header", { className: "App-header" },
                react_1.default.createElement("img", { src: logo_svg_1.default, className: "App-logo", alt: "logo" }),
                react_1.default.createElement("p", null,
                    "Edit ",
                    react_1.default.createElement("code", null, "src/App.tsx"),
                    " and save to reload."),
                react_1.default.createElement("a", { className: "App-link", href: "https://reactjs.org", target: "_blank", rel: "noopener noreferrer" }, "Learn React"))));
    }
    exports.App = App;
});
// export function SocketIoEx() {
//     const [response, setResponse] = useState("");
//     console.log(`endpoint: ${endpoint}`);
//     socket.on("api", (data: string) => {
//       console.log(`response: ${data}`);
//       setResponse(data);
//     });
//     return (
//       <p>It's {response}</p>
//     );
// }
// const ahmed = (message: string) => {
//   socket.emit('ahmed', message);
// }
//# sourceMappingURL=App.js.map