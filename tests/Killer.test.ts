import { Killer, Player, Knife, Canvas } from '../src';

test('set player as killer', () => {
    const player: Player = new Player('killer2343');
    Killer.setKiller(player);
    expect(Killer.killer).toBeDefined();
    expect(Killer.isKillerSet).toBe(true);
    expect(player.isKiller).toBe(true);
}); 

test('unset killer with no kills', () => {
    const player: Player = new Player('killer2343');
    Killer.setKiller(player);
    const data: any = {};
    data[player.id] = player;
    
    Killer.unsetKiller(data);
    expect(Killer.killer).toBeDefined();
    expect(Killer.isKillerSet).toBe(true);
    expect(player.isKiller).toBe(true);
}); 

test('unset killer when there isnt a killer', () => {
    Killer.killer = null;
    Killer.isKillerSet = false;
    
    const player: Player = new Player('killer2343');
    const data: any = {};
    data[player.id] = player;
    Killer.unsetKiller(data);

    expect(Killer.killer).toBeNull();
    expect(Killer.isKillerSet).toBe(false);
});

test('unset killer maximum session kills', () => {
    const player: Player = new Player('killer2343');
    player.sessionKills = 6;
    Killer.setKiller(player);
    const data: any = {};
    data[player.id] = player;
    
    Killer.unsetKiller(data);
    expect(Killer.killer).toBeNull();
    expect(Killer.isKillerSet).toBe(false);
    expect(player.isKiller).toBe(false);
});

test('unset killer with sent knife icon', () => {
    const player: Player = new Player('killer2343');
    player.knifeSent = true;
    player.sessionKills = 6;
    Killer.setKiller(player);
    const data: any = {};
    data[player.id] = player;
    
    Killer.unsetKiller(data);
    expect(Killer.killer).toBeNull();
    expect(Killer.isKillerSet).toBe(false);
    expect(player.isKiller).toBe(false);
    expect(player.knifeSent).toBe(false);
});

test('send knife for players within canvas', () => {
    const knife: Knife = Killer.setKnife();
    
    expect(knife).toBeDefined();
    expect(knife.exists).toBe(true);
    expect(knife.x).toBeLessThan(Canvas.width);
    expect(knife.y).toBeLessThan(Canvas.height);
});
