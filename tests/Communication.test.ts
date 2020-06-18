import { Communication, Player, Game, Killer, Knife } from '../src';
import SocketMock from 'socket.io-mock';

test('test communication socket send name to client', () => {
    const socket: any = new SocketMock();
    const communication: Communication = new Communication(socket);
    const expectedName: string = 'Ahmed Aldhaheri';
    socket.on('name', function(name: string) {
        expect(name).toBe(expectedName)
    });
    communication.sendName(expectedName);
});

test('test communication send player to client', () => {
    const socket: any = new SocketMock();
    const communication: Communication = new Communication(socket);
    const player1: Player = new Player('testPlayer1232');
    socket.on('initilizePlayer', function(player: Player) {
        expect(player).toMatchObject(player);
    });
    communication.sendPlayer(player1);
});

test('test communication send game state to mutliple players', () => {
    const sockets: any = {};
    const socket: any = new SocketMock();
    const communication: Communication = new Communication(socket);
    const data: any = {};
    const player1: Player = new Player('testGameState12');
    const player2: Player = new Player('testGameState34243');
    
    data[player1.id] = player1;
    data[player2.id] = player2;
    sockets[player1.id] = new SocketMock();
    sockets[player2.id] = new SocketMock();

    for (var i in sockets) {
        sockets[i].on('gameStateChange', function(players: any) {
            expect(players).toMatchObject(data);
        });
    }

    communication.stateChange(data, sockets);
});

test('test communication not sending knife shape when game hasnt started', () => {
    const sockets: any = {};
    const socket: any = new SocketMock();
    const communication: Communication = new Communication(socket);
    const data: any = {};
    Game.started = false;
    const knife: Knife = Killer.knife;
    const player1: Player = new Player('testSendKnife12');
    const player2: Player = new Player('testSnedKnife23');
    
    data[player1.id] = player1;
    data[player2.id] = player2;
    sockets[player1.id] = new SocketMock();
    sockets[player2.id] = new SocketMock();
    communication.sendKnifeShape(knife, data, sockets);
    expect(data[player1.id].knifeSent).toBeFalsy();
    expect(data[player2.id].knifeSent).toBeFalsy();
});

test('test communication not sending knife shape when game knife doesnt exist', () => {
    const sockets: any = {};
    const socket: any = new SocketMock();
    const communication: Communication = new Communication(socket);
    const data: any = {};
    Game.started = true;
    const knife: Knife = Killer.knife;
    knife.exists = false;
    const player1: Player = new Player('testSendKnife12');
    const player2: Player = new Player('testSnedKnife23');
    
    data[player1.id] = player1;
    data[player2.id] = player2;
    sockets[player1.id] = new SocketMock();
    sockets[player2.id] = new SocketMock();
    communication.sendKnifeShape(knife, data, sockets);
    expect(data[player1.id].knifeSent).toBeFalsy();
    expect(data[player2.id].knifeSent).toBeFalsy();
});

test('test communication send knife player name not set', () => {
    const sockets: any = {};
    const socket: any = new SocketMock();
    const communication: Communication = new Communication(socket);
    const data: any = {};
    Game.started = true;
    const knife1: Knife = Killer.knife;
    knife1.exists = true;
    const player1: Player = new Player('testSendKnife12');
    const player2: Player = new Player('testSendKnife23');
    player1.name = null;
    player2.name = null;
    player1.knifeSent = false;
    player2.knifeSent = false;
    data[player1.id] = player1;
    data[player2.id] = player2;
    sockets[player1.id] = new SocketMock();
    sockets[player2.id] = new SocketMock();
    
    communication.sendKnifeShape(knife1, data, sockets);
    expect(player1.knifeSent).toBeTruthy();
    expect(player2.knifeSent).toBeTruthy();
});

test('test communication send knife to mutliple players', () => {
    const sockets: any = {};
    const socket: any = new SocketMock();
    const communication: Communication = new Communication(socket);
    const data: any = {};
    const player1: Player = new Player('testSendKnife12');
    const player2: Player = new Player('testSnedKnife23');
    player1.setName('Ahmed Aldhaheri');
    player2.setName('Mohammad Aldhaheri');
    Game.started = true;
    const knife: Knife = Killer.knife;
    knife.exists = true;
    data[player1.id] = player1;
    data[player2.id] = player2;
    sockets[player1.id] = new SocketMock();
    sockets[player2.id] = new SocketMock();

    for (var i in sockets) {
        sockets[i].on('knifeCreated', function(knife1: Knife) {
            expect(knife1).toMatchObject(knife);
            expect(player1.knifeSent).toBeTruthy();
            expect(player2.knifeSent).toBeTruthy();
        });
    }

    communication.sendKnifeShape(knife, data, sockets);
});

test('test communication send knife and player collision to mutliple players', () => {
    const sockets: any = {};
    const socket: any = new SocketMock();
    const communication: Communication = new Communication(socket);
    const data: any = {};
    const player1: Player = new Player('testGameState12');
    const player2: Player = new Player('testGameState34243');

    data[player1.id] = player1;
    data[player2.id] = player2;
    sockets[player1.id] = new SocketMock();
    sockets[player2.id] = new SocketMock();

    for (var i in sockets) {
        sockets[i].on('knifeCollision', function(param: any) {
            expect(param).toMatchObject({});
        });
    }

    communication.sendKnifeCollision(data, sockets);
});

test('test communication send player disconnected to players', () => {
    const socket: any = new SocketMock();
    const communication: Communication = new Communication(socket);
    const player: Player = new Player('testDisconnect');

    socket.on('disconnect', function (player1) {
        expect(player1).toMatchObject(player);
    })

    communication.disconnect(player);
});



