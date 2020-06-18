import { Canvas } from './Canvas';

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
    public sessionKills: number;
    public name: string = '';
    public image: string;
    public static icons: string[] = ['./views/running.png', './views/run.png', './views/run1.png', './views/run2.png'];
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
        this.sessionKills = 0;
        this.image = Player.getImage();
        this.triggerKey = { 40: false, 38: false, 39: false, 37: false };
        this.knifeSent = false;
    }

    public static getImage(): string {
        return Player.icons[Math.floor(Math.random() * (1 - 0 + 3)) + 0];
    }

    public setName(name: string): void {
        this.name = name;
    }

    public repositionPlayer(): void {
        this.x = Math.floor((Math.random() * Canvas.width / 2) % Canvas.width);
        this.y = Math.floor((Math.random() * Canvas.height / 2) % Canvas.height);
    }

    public unsetKnifeSent(): void { 
        this.knifeSent = false;
    }
}