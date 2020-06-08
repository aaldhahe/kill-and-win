"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var app = express_1.default();
var port = 8080; // default port to listen
var NODE_ENV = process.env.NODE_ENV;
var serveApp = NODE_ENV === 'development' ? '../dist/src' : './';
app.use(express_1.default.static(path_1.default.join(__dirname, serveApp)));
// define a route handler for the default home page
// app.get( "/", ( req, res ) => {
//     res.send( "Hello world! this is ahmed aldhaheri just changed file" );
// } );
app.get('/', function (req, res) {
    res.sendFile(path_1.default.join(__dirname, serveApp, 'index.html'));
});
// start the Express server
app.listen(port, function () {
    console.log("server started at http://localhost:" + port);
});
