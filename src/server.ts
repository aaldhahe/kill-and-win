import express from 'express';
import path from 'path';
import http from 'http';
import socketio from 'socket.io';
import { Communication } from './Communication';
import { Player, TriggerKey } from './Player';
import { Animation } from './Animation';

const app = express();
const port = process.env.PORT || 8080; // default port to listen

const NODE_ENV: string | undefined = process.env.NODE_ENV;
const serveApp: string = NODE_ENV === 'production' ? '../dist/src' : './';
let interval: any;

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
        // player = new Player(playerCon.id, data.name, '#000FF');
        // animation = new Animation(player, true);
        player.setName(data.name);
        console.log(`player ${player.name} is connected`);
        communication.sendPlayer(player);
    });

    playerCon.on('keyInput', function(keys: TriggerKey) {
        player.triggerKey = keys;
    });

    setInterval(() => communication.stateChange(player), 40);
    setInterval(() => animation.movePlayer(), 40);

});
