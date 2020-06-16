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
const serveApp: string = NODE_ENV === 'production' ? '../dist/src' : './';

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


io.on('connection', function(playerCon: SocketIOClient.Socket) {
    playerCon.id = `${Math.random()}`;
    console.log(`player ${playerCon.id} connected`);
    playerCon.connected = true;
    playerCon.disconnected = false;

    const player: Player = new Player(playerCon.id, '#000FF');
    const animation: Animation = new Animation(player, true);
    const communication: Communication = new Communication(playerCon);
    
    playerCon.on('name', function(data: any) {
        player.setName(data.name);
        console.log(`player ${player.name} is connected`);
        Game.setGameStarted();
        Collision.setPlayers(player);
        communication.sendPlayer(player);
        communication.sendKnifeShape(Killer.knife);
    });

    playerCon.on('keyInput', function(keys: TriggerKey) {
        player.triggerKey = keys;
    });

    setInterval(() => communication.stateChange(player), 40);
    setInterval(() => animation.movePlayer(), 40);
    // setInterval(() => communication.sendKnifeShape(Killer.knife), 40);
    setInterval(() => Collision.knifeCollision(communication), 40);

});
