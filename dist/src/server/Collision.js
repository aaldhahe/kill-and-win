"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collision = void 0;
var Killer_1 = require("./Killer");
var Game_1 = require("./Game");
var Collision = /** @class */ (function () {
    function Collision() {
    }
    Collision.knifeCollision = function (communication, socket) {
        if (Game_1.Game.started && Killer_1.Killer.knife.exists) {
            if (Collision.players) {
                for (var i in Collision.players) {
                    var collision = Collision.collision(Collision.players[i], Killer_1.Killer.knife);
                    if (collision) {
                        console.log('knife collision');
                        Killer_1.Killer.knife.exists = false;
                        Killer_1.Killer.setKiller(Collision.players[i]);
                        communication.sendKnifeCollision(Collision.players, socket);
                        break;
                    }
                }
            }
        }
        return false;
    };
    Collision.setPlayers = function (players) {
        Collision.players = players;
    };
    Collision.playerCollision = function () {
        if (Game_1.Game.started && Killer_1.Killer.isKillerSet) {
            if (Collision.players) {
                for (var i in Collision.players) {
                    if (!Collision.players[i].isKiller) {
                        var collision = Collision.collision(Collision.players[i], Killer_1.Killer.killer);
                        if (collision) {
                            console.log('player collision');
                            Killer_1.Killer.killer.kills++;
                            Killer_1.Killer.killer.sessionKills++;
                            Collision.players[i].repositionPlayer();
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    };
    Collision.collision = function (shape1, shape2) {
        Collision.isCollision =
            shape1.x < shape2.x + shape2.width - 20 &&
                shape1.x + shape1.width > shape2.x &&
                shape1.y < shape2.y + shape2.height - 20 &&
                shape1.y + shape1.height > shape2.y;
        return Collision.isCollision;
    };
    Collision.knifeCollisionHappened = false;
    Collision.isCollision = false;
    return Collision;
}());
exports.Collision = Collision;
//# sourceMappingURL=Collision.js.map