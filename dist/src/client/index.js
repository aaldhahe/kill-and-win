"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var playername = onload();
var endpoint = "http://127.0.0.1:8080";
var interval;
var socket;
var communication;
var keysDown = {
    37: false,
    38: false,
    39: false,
    40: false,
};
function main() {
    socket = new Connection(endpoint).client();
    communication = new Communication(socket);
    var players = {};
    var renderStack = [];
    communication.name({
        name: playername,
    });
    var scorecard = document.getElementById("scoreboard");
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    background(ctx, "#eee");
    socket.on("initilizePlayer", function (player) {
        console.log("player initilized: ", player);
        players[player.id] = player;
        renderPlayers(ctx, renderStack, players);
    });
    socket.on("gameStateChange", function (player) {
        return __awaiter(this, void 0, void 0, function () {
            var i, currentPlayer;
            return __generator(this, function (_a) {
                scorecard.innerHTML = '';
                removeDisconnectedPlayers(players, player);
                for (i in player) {
                    currentPlayer = player[i];
                    players[i] = currentPlayer;
                    scorecard.innerHTML += "<li>" + currentPlayer.name + "'s kills: " + currentPlayer.kills + "</li><br />";
                }
                render(ctx, "#eee", renderStack);
                return [2 /*return*/];
            });
        });
    });
    socket.on("knifeCreated", function (knife) {
        console.log("render knife");
        renderKnife(ctx, renderStack, knife);
    });
    socket.on('knifeCollision', function () {
        console.log('knife collision');
        if (renderStack.length > 1) {
            renderStack.pop();
        }
    });
    socket.on('disconnect', function (id) {
        delete players[id];
    });
    var animate = function () {
        requestAnimationFrame(animate);
    };
    addEventListener("keydown", keyDownHandelr);
    addEventListener("keyup", keyUpHandler);
}
function onload() {
    return prompt("what is your name", "");
}
function Connection(url) {
    this.endpoint = url;
    Connection.prototype.client = function () {
        return io();
    };
}
function Communication(socket) {
    this.socket = socket;
    Communication.prototype.name = function (name) {
        this.socket.emit("name", name);
    };
    Communication.prototype.sendInput = function (keys) {
        this.socket.emit("keyInput", keys);
    };
}
function background(context, color) {
    var img = new Image();
    img.src = "./views/background.png";
    context.imageSmoothingEnabled = false;
    var pat = context.createPattern(img, "repeat");
    context.rect(1, 0, context.canvas.width, context.canvas.height);
    context.fillStyle = pat;
    context.fill();
}
function render(context, color, stack) {
    background(context, color);
    for (var i = 0; i < stack.length; i++) {
        stack[i]();
    }
}
function renderPlayers(context, stack, players) {
    stack.push(function () {
        for (var i in players) {
            context.font = "20px Arial";
            context.fillStyle = "white";
            context.fillText(players[i].name, players[i].x - 5, players[i].y - 5);
            context.beginPath();
            var img = new Image();
            img.src = players[i].image;
            context.drawImage(img, players[i].x, players[i].y, 80, 80);
            context.fill();
        }
    });
}
function renderKnife(context, stack, knife) {
    stack.push(function () {
        context.fillStyle = "0000FF";
        var img = new Image();
        img.src = knife.icon;
        context.drawImage(img, knife.x, knife.y);
        context.fill();
    });
}
function keyUpHandler(key) {
    if (key.keyCode == 38 ||
        key.keyCode == 40 ||
        key.keyCode == 37 ||
        key.keyCode == 39) {
        keysDown[key.keyCode] = false;
        communication.sendInput(keysDown);
    }
}
function keyDownHandelr(key) {
    if (key.keyCode == 38 ||
        key.keyCode == 40 ||
        key.keyCode == 37 ||
        key.keyCode == 39) {
        if (keysDown[key.keyCode] != true) {
            keysDown[key.keyCode] = true;
            communication.sendInput(keysDown);
        }
    }
}
function sleep(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
function removeDisconnectedPlayers(playersA, playersB) {
    var keysA = Object.keys(playersA).sort();
    var keysB = Object.keys(playersB).sort();
    for (var i = 0; i < keysA.length; i++) {
        if (!keysB.includes(keysA[i])) {
            delete playersA[keysA[i]];
        }
    }
}
//# sourceMappingURL=index.js.map