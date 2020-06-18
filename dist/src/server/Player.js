"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
var Canvas_1 = require("./Canvas");
var Player = /** @class */ (function () {
    function Player(id) {
        this.name = '';
        this.isKiller = false;
        this.id = id;
        this.x = 500;
        this.y = 290;
        this.height = 80;
        this.width = 80;
        this.kills = 0;
        this.sessionKills = 0;
        this.image = Player.getImage();
        this.triggerKey = { 40: false, 38: false, 39: false, 37: false };
        this.knifeSent = false;
    }
    Player.getImage = function () {
        return Player.icons[Math.floor(Math.random() * (1 - 0 + 1)) + 0];
    };
    Player.prototype.setName = function (name) {
        this.name = name;
    };
    Player.prototype.repositionPlayer = function () {
        this.x = Math.floor((Math.random() * Canvas_1.Canvas.width / 2) % Canvas_1.Canvas.width);
        this.y = Math.floor((Math.random() * Canvas_1.Canvas.height / 2) % Canvas_1.Canvas.height);
    };
    Player.prototype.unsetKnifeSent = function () {
        this.knifeSent = false;
    };
    Player.icons = ['./views/running.png', './views/run.png'];
    return Player;
}());
exports.Player = Player;
//# sourceMappingURL=Player.js.map