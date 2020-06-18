import { Player, Canvas } from '../src';

test('player gets an icon', () => {
    const player: Player = new Player('testIcon');
    expect(Player.getImage()).toContain('.png');
    expect(player.image).toBeDefined();
}); 

test('test player object field members', () => {
    const player: Player = new Player('testPlayer1');
    expect(player).toBeInstanceOf(Player);
    expect(player.id).toEqual('testPlayer1');
    expect(player.isKiller).toBeFalsy();
    expect(player.sessionKills).toBe(0);
    expect(player.triggerKey).toBeDefined();
    expect(player.x).toEqual(Canvas.width / 2);
    expect(player.y).toEqual(Canvas.height / 2);
    expect(player.knifeSent).toBeFalsy();
}); 

test('test setting player name', () => {
    const player: Player = new Player('testName');
    const name: string = 'Ahmed';
    player.setName(name);
    expect(player.name).toBeDefined();
    expect(player.name).toBe(name);
});

test('test repositioning player within canvas', () => {
    const player: Player = new Player('testRepositon');
    player.repositionPlayer();
    expect(player.x).toBeLessThan(Canvas.width);
    expect(player.y).toBeLessThan(Canvas.height);
});

test('test unset player knife', () => {
    const player: Player = new Player('testRepositon');
    player.knifeSent = true;
    expect(player.knifeSent).toBeTruthy();
    player.unsetKnifeSent();
    expect(player.knifeSent).toBeFalsy();
});

