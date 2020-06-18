import { Collision, Game, Killer, Player, Communication } from '../src';
import SocketMock from 'socket.io-mock';

test('set players for collision class', () => {
    const player: Player = new Player('testCollision');
    const player2: Player = new Player('testCollision2');
    const data: any = {};
    data[player.id] = player;
    data[player2.id] = player2;
    Collision.setPlayers(data);
    expect(Collision.players).toBeDefined();
    expect(Collision.players[player.id]).toBeDefined();
    expect(Collision.players[player2.id]).toBeDefined();
    Collision.players = null;
    expect(Collision.players).toBeNull();
});

test('detect collision when it happens', () => {
    const shape1: any = {x: 500, y: 290, height: 80, width: 80};
    const shape2: any = {x: 520, y: 310, height: 61, width: 80};
    const isCollision: boolean = Collision.collision(shape1, shape2);
    expect(isCollision).toBeTruthy();
});

test('detect no collision', () => {
    const shape1: any = {x: 500, y: 290, height: 80, width: 80};
    const shape2: any = {x: 50, y: 30, height: 61, width: 80};
    const isCollision: boolean = Collision.collision(shape1, shape2);
    expect(isCollision).toBeFalsy();
});

test('detect player collision with knife when game started but no knife', () => {
    const socket: any = new SocketMock();
    const communication: Communication = new Communication(socket);
    Game.started = true;
    const knifeCollision: boolean = Collision.knifeCollision(communication, socket);
    expect(knifeCollision).toBeFalsy();
}); 

test('detect player collision with knife when game hasnt started', () => {
    const socket: any = new SocketMock();
    const communication: Communication = new Communication(socket);
    Game.started = false;
    Killer.knife.exists = true;
    const knifeCollision: boolean = Collision.knifeCollision(communication, socket);
    expect(knifeCollision).toBeFalsy();
}); 

test('detect player collision with knife when game has no players', () => {
    const socket: any = new SocketMock();
    const communication: Communication = new Communication(socket);
    Game.started = true;
    Killer.knife.exists = true;
    const knifeCollision: boolean = Collision.knifeCollision(communication, socket);
    expect(knifeCollision).toBeFalsy();
}); 

test('detect no collision between knife and player', () => {
    const socket: any = new SocketMock();
    const communication: Communication = new Communication(socket);
    Game.started = true;
    Killer.knife.exists = true;
    const player: Player = new Player('testKnifeCollision');
    const data: any = {};
    data[player.id] = player;
    Collision.setPlayers(data);
    Killer.knife.x = 200;
    Killer.knife.y = 100;
    Collision.knifeCollision(communication, socket);
    expect(Collision.isCollision).toBeFalsy();
}); 

test('detect player collision with knife', () => {
    const socket: any = new SocketMock();
    const communication: Communication = new Communication(socket);
    Game.started = true;
    Killer.knife.exists = true;
    const player: Player = new Player('testKnifeCollision');
    const data: any = {};
    const data2: any = {};
    data[player.id] = player;
    data2[player.id] = socket;
    Collision.setPlayers(data);
    Killer.knife.x = 520;
    Killer.knife.y = 310;
    socket.on('knifeCollision', function(param) {
        expect(param).toMatchObject({});
    });
    Collision.knifeCollision(communication, data2);
    expect(Collision.isCollision).toBeTruthy();
}); 

test('detect player collision with other player when game hasnt started', () => {
    Game.started = false;
    const playerCollision: boolean = Collision.playerCollision();
    expect(playerCollision).toBeFalsy();
}); 

test('detect player collision with other player when game has no killer', () => {
    Game.started = true;
    Killer.isKillerSet = false;
    const playerCollision: boolean = Collision.playerCollision();
    expect(playerCollision).toBeFalsy();
}); 

test('detect player collision with other player when game has no players', () => {
    Game.started = true;
    Killer.isKillerSet = true;
    Collision.players = null;
    const playerCollision: boolean = Collision.playerCollision();
    expect(playerCollision).toBeFalsy();
}); 

test('detect player collision with other player when game has no killer', () => {
    Game.started = true;
    Killer.isKillerSet = false;
    const playerCollision: boolean = Collision.playerCollision();
    expect(playerCollision).toBeFalsy();
}); 

test('detect player collision with other killer', () => {
    Game.started = true;
    Killer.isKillerSet = true;
    const player1: Player = new Player('testKiller');
    const player2: Player = new Player('testKiller232');
    const data: any = {};
    Killer.killer = player2;
    const killsBefore: number = Killer.killer.kills;
    data[player1.id] = player1;
    Collision.setPlayers(data);
    const playerCollision: boolean = Collision.playerCollision();
    const killsAfter: number = Killer.killer.kills;
    const expectedKills: number = 1;
    expect(playerCollision).toBeTruthy();
    expect(killsBefore).toBeLessThan(killsAfter);
    expect(killsAfter).toBe(expectedKills);
});








