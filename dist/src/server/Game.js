"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
var Game = /** @class */ (function () {
    function Game() {
    }
    Game.isGameStarted = function (players) {
        if (Object.keys(players).length >= 2) {
            Game.started = true;
        }
        else {
            Game.started = false;
        }
    };
    Game.started = false;
    return Game;
}());
exports.Game = Game;
//# sourceMappingURL=Game.js.map