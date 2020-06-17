export interface Keys {
    down: number;
    up: number;
    right: number;
    left: number;
}

export interface TriggerKey {
    40: boolean,
    38: boolean,
    39: boolean,
    37: boolean
}

export class Player {
    public isKiller: boolean;
    public id: string;
    public x: number;
    public y: number;
    public width: number;
    public height: number
    public kills: number;
    public name: string = '';
    public image: string;
    public static icons: string[] = ['./views/running.png', './views/run.png'];
    public triggerKey: TriggerKey;
    public knifeSent: boolean;

    constructor(id: string) {
        this.isKiller = false;
        this.id = id;
        this.x = 500;
        this.y = 290;
        this.height = 80;
        this.width = 80;
        this.kills = 0;
        this.image = Player.getImage();
        this.triggerKey = { 40: false, 38: false, 39: false, 37: false };
        this.knifeSent = false;
    }

    public static getImage(): string {
        return Player.icons[Math.floor(Math.random() * (1 - 0 + 1)) + 0];
    }

    public setName(name: string): void {
        this.name = name;
    }
}