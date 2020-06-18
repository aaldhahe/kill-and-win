import express from 'express';
import path from 'path';
import http from 'http';
import socketio from 'socket.io';
import { Communication } from './Communication';
import { Player, TriggerKey } from './Player';
import { Animation } from './Animation';
import { Killer } from './Killer';
import { Game } from './Game';
import { Collision } from './Collision';

const app = express();
const port = process.env.PORT || 8080; // default port to listen

const NODE_ENV: string | undefined = process.env.NODE_ENV;
const serveApp: string = NODE_ENV === 'production' ? '../dist/src' : '../client';

app.use(express.static(path.join(__dirname, serveApp)));


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, `${serveApp}/views`, 'index.html'));
});

const server = http.createServer(app);

const io = socketio(server);

// start the Express server
server.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );

let players: any = {};
let socketList: any = {};

io.on('connection', function(playerCon: SocketIOClient.Socket) {
    playerCon.id = `${Math.random()}`;
    playerCon.connected = true;
    playerCon.disconnected = false;

    players[playerCon.id] = new Player(playerCon.id);
    socketList[playerCon.id] = playerCon;
    Game.isGameStarted(players);
    Collision.setPlayers(players);
    const animation: Animation = new Animation(players, true);
    const communication: Communication = new Communication(playerCon);

    playerCon.on('name', function(data: any) {
        players[playerCon.id].setName(data.name);
        console.log(`player ${players[playerCon.id].name} is connected`); 
        communication.sendPlayer(players[playerCon.id]);
        communication.sendKnifeShape(Killer.knife, players, socketList);
    });

    playerCon.on('keyInput', function(keys: TriggerKey) {
        players[playerCon.id].triggerKey = keys;
    });

    playerCon.on('disconnect', function (){
        console.log(`player ${playerCon.id} disconnected`);
        if (players[playerCon.id].isKiller) {
            Killer.knife.exists = true;
            Killer.unsetKnifeSent(players);
            Killer.unsetKiller(players);
        }
        delete players[playerCon.id];
        delete socketList[playerCon.id];
    });

    setInterval(() => communication.stateChange(players, socketList), 55);
    setInterval(() => animation.movePlayer(), 55);
    setInterval(() => Collision.knifeCollision(communication, socketList), 55);
    setInterval(() => Collision.playerCollision(), 55);
    setInterval(() => communication.sendKnifeShape(Killer.knife, players, socketList), 3000);
    setInterval(() => Killer.unsetKiller(players), 30000);

});

