import socketIOClient from 'socket.io-client';

export class Connection {
    private endpoint: string;
    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    public client(): SocketIOClient.Socket {
        return socketIOClient(this.endpoint);
    }
}