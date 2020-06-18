import { Animation, Player, Canvas } from '../src';

let player1: Player;
let player2: Player;


test('animate player move right', () => {
    let data: any = {};
    player1 = new Player('testRight234');
    data[player1.id] = player1;
    data[player1.id].triggerKey[39] = true;
    const xBefore: number = data[player1.id].x;
    const animation = new Animation(data, true);
    animation.movePlayer();
    
    const xAfter: number = data[player1.id].x;
    const expectedVal: number = xBefore + 5;
    expect(xAfter > xBefore).toBe(true);
    expect(xAfter < Canvas.width).toBe(true);
    expect(xAfter).toBe(expectedVal);
});

test('animate player move left', () => {
    let data: any = {};
    player1 = new Player('testLeft343');
    data[player1.id] = player1;
    data[player1.id].triggerKey[37] = true;
    const xBefore: number = data[player1.id].x;
    const animation = new Animation(data, true);
    animation.movePlayer();
    
    const xAfter: number = data[player1.id].x;
    const expectedVal: number = xBefore - 5;
    expect(xAfter < xBefore).toBe(true);
    expect(xAfter < Canvas.width).toBe(true);
    expect(xAfter).toBe(expectedVal);
}); 

test('animate player move up', () => {
    let data: any = {};
    player1 = new Player('testUp783');
    data[player1.id] = player1;
    data[player1.id].triggerKey[38] = true;
    const yBefore: number = data[player1.id].y;
    const animation = new Animation(data, true);
    animation.movePlayer();
    
    const yAfter: number = data[player1.id].y;
    const expectedVal: number = yBefore - 5;
    expect(yAfter < yBefore).toBe(true);
    expect(yAfter < Canvas.height).toBe(true);
    expect(yAfter).toBe(expectedVal);
}); 

test('animate player move down', () => {
    let data: any = {};
    player1 = new Player('testDown783');
    data[player1.id] = player1;
    data[player1.id].triggerKey[40] = true;
    const yBefore: number = data[player1.id].y;
    const animation = new Animation(data, true);
    animation.movePlayer();
    
    const yAfter: number = data[player1.id].y;
    const expectedVal: number = yBefore + 5;
    expect(yAfter > yBefore).toBe(true);
    expect(yAfter < Canvas.height).toBe(true);
    expect(yAfter).toBe(expectedVal);
}); 

test('animate two players move right and up', () => {
    let data: any = {};
    player1 = new Player('testUP783');
    player2 = new Player('testRight934');
    data[player1.id] = player1;
    data[player2.id] = player2;
    data[player1.id].triggerKey[38] = true;
    data[player2.id].triggerKey[39] = true;

    const yBefore: number = data[player1.id].y;
    const xBefore: number = data[player2.id].x;
    const animation = new Animation(data, true);
    animation.movePlayer();
    
    const yAfter: number = data[player1.id].y;
    const xAfter: number = data[player2.id].x;
    const yexpectedVal: number = yBefore - 5;
    const xexepctedVal: number = xBefore + 5;
    
    expect(yAfter < yBefore).toBe(true);
    expect(yAfter < Canvas.height).toBe(true);
    expect(yAfter).toBe(yexpectedVal);
    expect(xAfter > xBefore).toBe(true);
    expect(xAfter < Canvas.width).toBe(true);
    expect(xAfter).toBe(xexepctedVal);
}); 

test('animate killer move right', () => {
    let data: any = {};
    player1 = new Player('testKiller234');
    data[player1.id] = player1;
    data[player1.id].isKiller = true;
    data[player1.id].triggerKey[39] = true;
    const xBefore: number = data[player1.id].x;
    const animation = new Animation(data, true);
    animation.movePlayer();
    
    const xAfter: number = data[player1.id].x;
    const expectedVal: number = xBefore + 7;
    expect(xAfter > xBefore).toBe(true);
    expect(xAfter < Canvas.width).toBe(true);
    expect(xAfter).toBe(expectedVal);
});

test('animate player move down outside canvas height', () => {
    let data: any = {};
    player1 = new Player('testDown783');
    data[player1.id] = player1;
    data[player1.id].y = Canvas.height;
    data[player1.id].triggerKey[40] = true;
    const yBefore: number = data[player1.id].y;
    const animation = new Animation(data, true);
    animation.movePlayer();
    
    const yAfter: number = data[player1.id].y;
    const expectedVal: number = (yBefore + 5) % Canvas.height;
    expect(yAfter < yBefore).toBe(true);
    expect(yAfter < Canvas.height).toBe(true);
    expect(yAfter).toBe(expectedVal);
}); 

test('animate player move right outside canvas width', () => {
    let data: any = {};
    player1 = new Player('testRight234');
    data[player1.id] = player1;
    data[player1.id].x = Canvas.width;
    data[player1.id].triggerKey[39] = true;
    const xBefore: number = data[player1.id].x;
    const animation = new Animation(data, true);
    animation.movePlayer();
    
    const xAfter: number = data[player1.id].x;
    const expectedVal: number = (xBefore + 5) % Canvas.width;
    expect(xAfter < xBefore).toBe(true);
    expect(xAfter < Canvas.width).toBe(true);
    expect(xAfter).toBe(expectedVal);
});

test('animate player move left outside canvas', () => {
    let data: any = {};
    player1 = new Player('testRight234');
    data[player1.id] = player1;
    data[player1.id].x = -20;
    data[player1.id].triggerKey[37] = true;
    const xBefore: number = data[player1.id].x;
    const animation = new Animation(data, true);
    animation.movePlayer();
    
    const xAfter: number = data[player1.id].x;
    const expectedVal: number = ((xBefore - 5) + Canvas.width) % Canvas.width;
    expect(xAfter > xBefore).toBe(true);
    expect(xAfter < Canvas.width).toBe(true);
    expect(xAfter).toBe(expectedVal);
});


