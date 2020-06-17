import { Player } from "./Player";
import { Canvas } from "./Canvas";

export interface Keys {
    LEFT: boolean;
    UP: boolean;
    RIGHT: boolean;
    DOWN: boolean;
}

export class Animation {
  public killerSpeed: number = 6;
  public normalSpeed: number = 5;
  public gameStarted: boolean;
  public keys: any;
  public players: any;

  constructor(players: any, gameStarted: boolean) {
    this.players = players;
    this.gameStarted = gameStarted;
    this.keys = {};
  }

  public movePlayer(): void {
    let speed: number = this.normalSpeed;
    for (var i in this.players) {
      if (this.players[i].isKiller) {
        speed = this.killerSpeed;
      }
      this.keys[i] = this.setKeys(this.players[i]);
      this.moveXAxis(speed, this.players[i]);
      this.moveYAxis(speed, this.players[i]);
    }
  }

  private moveXAxis(speed: number, player: Player): void {
    if (this.keys[player.id].RIGHT) {
      player.x += speed;
    } else if (this.keys[player.id].LEFT) {
      player.x -= speed;
    }
    player.x = this.resolveWithinCanvas(player.x, Canvas.width);
  }

  private moveYAxis(speed: number, player: Player): void {
    if (this.keys[player.id].DOWN) {
      player.y += speed;
    } else if (this.keys[player.id].UP) {
      player.y -= speed;
    }
    player.y = this.resolveWithinCanvas(player.y, Canvas.height);
  }

  private resolveWithinCanvas(coordinate: number, threshold: number): number {
    if (coordinate < 0) {
      return coordinate + threshold;
    }
    return coordinate % threshold;
  }

  private setKeys(player: any): Keys {
    return {
      LEFT: player.triggerKey[37],
      UP: player.triggerKey[38],
      RIGHT: player.triggerKey[39],
      DOWN: player.triggerKey[40],
    };
  }
}
