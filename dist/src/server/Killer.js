"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Killer = void 0;
var Player_1 = require("./Player");
var Canvas_1 = require("./Canvas");
var Killer = /** @class */ (function () {
    function Killer() {
    }
    Killer.setKiller = function (killer) {
        Killer.killer = killer;
        Killer.killer.isKiller = true;
        Killer.killer.image = Killer.icon;
        Killer.isKillerSet = true;
        return Killer.killer;
    };
    Killer.unsetKiller = function (players) {
        console.log("killer.kills: " + (Killer.killer ? Killer.killer.sessionKills : 'no killer'));
        if (!Killer.isKillerSet || (Killer.killer && Killer.killer.sessionKills <= 5)) {
            return;
        }
        console.log('unset killer');
        Killer.killer.isKiller = false;
        Killer.killer.image = Player_1.Player.getImage();
        Killer.killer.sessionKills = 0;
        Killer.isKillerSet = false;
        Killer.knife.exists = true;
        Killer.killer = null;
        Killer.unsetKnifeSent(players);
    };
    Killer.setKnife = function () {
        console.log('setKnife');
        return {
            exists: true,
            x: Math.floor((Math.random() * Canvas_1.Canvas.width / 2) % Canvas_1.Canvas.width),
            y: Math.floor((Math.random() * Canvas_1.Canvas.height / 2) % Canvas_1.Canvas.height),
            icon: "./views/knife.png",
            width: 80,
            height: 61
        };
    };
    Killer.unsetKnifeSent = function (players) {
        for (var i in players) {
            players[i].unsetKnifeSent();
        }
    };
    Killer.icon = "./views/killer.png";
    Killer.knife = Killer.setKnife();
    Killer.isKillerSet = false;
    return Killer;
}());
exports.Killer = Killer;
//# sourceMappingURL=Killer.js.map