"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Communication = void 0;
var Game_1 = require("./Game");
var Communication = /** @class */ (function () {
    function Communication(socket) {
        this.socket = socket;
    }
    Communication.prototype.sendName = function (name) {
        this.socket.emit("name", name);
    };
    Communication.prototype.sendPlayer = function (player) {
        this.socket.emit("initilizePlayer", player);
    };
    Communication.prototype.stateChange = function (players, socket) {
        for (var i in players) {
            var sock = socket[i];
            sock.emit('gameStateChange', players);
        }
    };
    Communication.prototype.sendKnifeShape = function (knife, players, socket) {
        if (Game_1.Game.started && knife.exists) {
            for (var i in players) {
                if (players[i].name !== '' && players[i].knifeSent) {
                    continue;
                }
                console.log("sending knife shape: " + knife.exists);
                var sock = socket[i];
                sock.emit("knifeCreated", knife);
                players[i].knifeSent = true;
            }
        }
    };
    Communication.prototype.sendKnifeCollision = function (players, socket) {
        for (var i in players) {
            var sock = socket[i];
            sock.emit('knifeCollision', {});
        }
    };
    Communication.prototype.disconnect = function (player) {
        this.socket.emit('disconnect', player.id);
    };
    return Communication;
}());
exports.Communication = Communication;
//# sourceMappingURL=Communication.js.map