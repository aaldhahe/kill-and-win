"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Animation = void 0;
var Canvas_1 = require("./Canvas");
var Animation = /** @class */ (function () {
    function Animation(players, gameStarted) {
        this.killerSpeed = 7;
        this.normalSpeed = 5;
        this.players = players;
        this.gameStarted = gameStarted;
        this.keys = {};
    }
    Animation.prototype.movePlayer = function () {
        var speed = this.normalSpeed;
        for (var i in this.players) {
            if (this.players[i].isKiller) {
                speed = this.killerSpeed;
            }
            this.keys[i] = this.setKeys(this.players[i]);
            this.moveXAxis(speed, this.players[i]);
            this.moveYAxis(speed, this.players[i]);
        }
    };
    Animation.prototype.moveXAxis = function (speed, player) {
        var newLocation = player.x;
        if (this.keys[player.id].RIGHT) {
            newLocation += speed;
        }
        else if (this.keys[player.id].LEFT) {
            newLocation -= speed;
        }
        player.x = this.resolveWithinCanvas(newLocation, Canvas_1.Canvas.width);
    };
    Animation.prototype.moveYAxis = function (speed, player) {
        var newLocation = player.y;
        if (this.keys[player.id].DOWN) {
            newLocation += speed;
        }
        else if (this.keys[player.id].UP) {
            newLocation -= speed;
        }
        player.y = this.resolveWithinCanvas(newLocation, Canvas_1.Canvas.height);
    };
    Animation.prototype.resolveWithinCanvas = function (coordinate, threshold) {
        if (coordinate < 0) {
            return coordinate + threshold;
        }
        return coordinate % threshold;
    };
    Animation.prototype.setKeys = function (player) {
        return {
            LEFT: player.triggerKey[37],
            UP: player.triggerKey[38],
            RIGHT: player.triggerKey[39],
            DOWN: player.triggerKey[40],
        };
    };
    return Animation;
}());
exports.Animation = Animation;
//# sourceMappingURL=Animation.js.map