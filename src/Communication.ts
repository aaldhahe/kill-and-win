import socketio from 'socket.io';
import { Player } from './Player';

export class Communication {
    private socket: SocketIOClient.Socket;
    constructor(socket: SocketIOClient.Socket) {
        this.socket = socket;
    }

    public sendName(name: string): void {
        this.socket.emit('name', name);
    }

    public sendPlayer(player: Player): void {
        this.socket.emit('initilizePlayer', player);
    }

    public stateChange(player: Player): void {
        this.socket.emit('gameStateChange', player);
    }
}