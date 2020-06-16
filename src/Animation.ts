import { Player } from './Player';
import { Canvas } from './Canvas';

export interface Keys {
    LEFT: boolean,
    UP: boolean,
    RIGHT: boolean,
    DOWN: boolean
};

export class Animation {
    public killerSpeed: number = 10;
    public normalSpeed: number = 8;
    public player: Player;
    public gameStarted: boolean;

    constructor(player: Player, gameStarted: boolean) {
        this.player = player;
        this.gameStarted = gameStarted;
    }
    
    public movePlayer(): void {
        let speed: number = this.normalSpeed;

        if (this.player.isKiller) {
            speed = this.killerSpeed;
        }
        this.moveXAxis(speed);
        this.moveYAxis(speed);
    }
   
    private moveXAxis(speed: number): void {
        if (this.player.triggerKey[39]) {
            this.player.x += speed;
        } else if (this.player.triggerKey[37]) {
            this.player.x -= speed;
        }
        this.player.x = this.resolveWithinCanvas(this.player.x, Canvas.width);
    }

    private moveYAxis(speed: number): void {
        if (this.player.triggerKey[40]) {
            this.player.y += speed;
        } else if (this.player.triggerKey[38]) {
            this.player.y -= speed;
        }
        this.player.y = this.resolveWithinCanvas(this.player.y, Canvas.height);
    }

    private resolveWithinCanvas(coordinate: number, threshold: number): number {
        if (coordinate < 0) {
            return coordinate + threshold;
        }
        return coordinate % threshold;
    }

}