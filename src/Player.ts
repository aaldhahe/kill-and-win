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
    public mousex: number;
    public mousey: number;
    public kills: number;
    public name: string = '';
    public color: string;
    public image: string;
    public static icons: string[] = ['./views/running.png', './views/run.png'];
    public keys: Keys;
    public triggerKey: TriggerKey;

    constructor(id: string, color: string) {
        this.isKiller = false;
        this.id = id;
        this.x = 500;
        this.y = 290;
        this.height = 80;
        this.width = 80;
        this.mousex = 500;
        this.mousey = 300;
        this.color = color;
        this.kills = 0;
        this.image = Player.getImage();
        this.keys = this.getKeys();
        this.triggerKey = this.triggerKeys();
    }

    public static getImage(): string {
        return Player.icons[Math.floor(Math.random() * (1 - 0 + 1)) + 0];
    }

    private getKeys(): Keys {
        return { down: 40, up: 38, right: 39, left: 37 };
    }

    private triggerKeys(): TriggerKey {
        return { 40: false, 38: false, 39: false, 37: false };
    }

    public setName(name: string): void {
        this.name = name;
    }
}