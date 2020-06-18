import { Player } from "./Player";
import { Canvas } from "./Canvas";

export interface Keys {
    LEFT: boolean;
    UP: boolean;
    RIGHT: boolean;
    DOWN: boolean;
}

export class Animation {
  public killerSpeed: number = 7;
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
    let newLocation: number = player.x;
    if (this.keys[player.id].RIGHT) {
      newLocation += speed;
    } else if (this.keys[player.id].LEFT) {
      newLocation -= speed;
    }
    player.x = this.resolveWithinCanvas(newLocation, Canvas.width);
  }

  private moveYAxis(speed: number, player: Player): void {
    let newLocation: number = player.y;
    if (this.keys[player.id].DOWN) {
      newLocation += speed;
    } else if (this.keys[player.id].UP) {
      newLocation -= speed;
    }
    player.y = this.resolveWithinCanvas(newLocation, Canvas.height);
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
