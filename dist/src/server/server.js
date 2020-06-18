"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var http_1 = __importDefault(require("http"));
var socket_io_1 = __importDefault(require("socket.io"));
var Communication_1 = require("./Communication");
var Player_1 = require("./Player");
var Animation_1 = require("./Animation");
var Killer_1 = require("./Killer");
var Game_1 = require("./Game");
var Collision_1 = require("./Collision");
var app = express_1.default();
var port = process.env.PORT || 8080; // default port to listen
var NODE_ENV = process.env.NODE_ENV;
var serveApp = NODE_ENV === 'production' ? '../dist/src' : '../client';
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
var players = {};
var socketList = {};
io.on('connection', function (playerCon) {
    playerCon.id = "" + Math.random();
    console.log("player " + playerCon.id + " connected");
    playerCon.connected = true;
    playerCon.disconnected = false;
    players[playerCon.id] = new Player_1.Player(playerCon.id);
    socketList[playerCon.id] = playerCon;
    Game_1.Game.isGameStarted(players);
    Collision_1.Collision.setPlayers(players);
    var animation = new Animation_1.Animation(players, true);
    var communication = new Communication_1.Communication(playerCon);
    playerCon.on('name', function (data) {
        players[playerCon.id].setName(data.name);
        console.log("player " + players[playerCon.id].name + " is connected");
        communication.sendPlayer(players[playerCon.id]);
        communication.sendKnifeShape(Killer_1.Killer.knife, players, socketList);
    });
    playerCon.on('keyInput', function (keys) {
        players[playerCon.id].triggerKey = keys;
    });
    playerCon.on('disconnect', function () {
        console.log("player " + playerCon.id + " disconnected");
        if (players[playerCon.id].isKiller) {
            Killer_1.Killer.knife.exists = true;
            Killer_1.Killer.unsetKnifeSent(players);
            Killer_1.Killer.unsetKiller(players);
        }
        delete players[playerCon.id];
        delete socketList[playerCon.id];
    });
    setInterval(function () { return communication.stateChange(players, socketList); }, 55);
    setInterval(function () { return animation.movePlayer(); }, 55);
    setInterval(function () { return Collision_1.Collision.knifeCollision(communication, socketList); }, 55);
    setInterval(function () { return Collision_1.Collision.playerCollision(); }, 55);
    setInterval(function () { return communication.sendKnifeShape(Killer_1.Killer.knife, players, socketList); }, 3000);
    setInterval(function () { return Killer_1.Killer.unsetKiller(players); }, 30000);
});
//# sourceMappingURL=server.js.map