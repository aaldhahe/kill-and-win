import { Game, Player } from '../src';
import { Server } from 'mock-socket';

let fakeUrl: string;
let mockServer: Server;
let player1: Player;
let player2: Player;

beforeAll( () => {
    fakeUrl = 'ws://localhost:8080';
    mockServer = new Server(fakeUrl);
    player1 = new Player('ahmedTest1234323');
    player2 = new Player('ahmedTest213231231');
});

test('game started is true', () => {
    const data: any = {};
    data[player1.id] = player1;
    data[player2.id] = player2;
    Game.isGameStarted(data);
    expect(Game.started).toBe(true);
}); 

test('game started is false', () => {
    const data: any = {};
    data[player1.id] = player1;
    Game.isGameStarted(data);
    expect(Game.started).toBe(false);
});