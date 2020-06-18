import { Connection } from '../src';
import socketIOClient from 'socket.io-client';

test('test client creates connection instance', () => {
    const endpoint: string = 'localhost:8080';
    expect(new Connection(endpoint)).toBeInstanceOf(Connection);
});

test('test client connects to server', () => {
    const endpoint: string = 'localhost:8080';
    const connection: Connection = new Connection(endpoint);
    expect(connection.client()).toBeInstanceOf(socketIOClient.Socket);
});
