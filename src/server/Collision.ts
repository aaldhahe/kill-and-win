import { Killer } from "./Killer";
import { Game } from "./Game";
import { Communication } from "./Communication";

export class Collision {
  public static players: any;
  public static knifeCollisionHappened: boolean = false;
  public static isCollision: boolean = false;

  public static knifeCollision(
    communication: Communication,
    socket: any
  ): boolean {
    if (Game.started && Killer.knife.exists) {
      if (Collision.players) {
        for (var i in Collision.players) {
          const collision: boolean = Collision.collision(
            Collision.players[i],
            Killer.knife
          );
          if (collision) {
            console.log('knife collision');
            Killer.knife.exists = false;
            Killer.setKiller(Collision.players[i]);
            communication.sendKnifeCollision(Collision.players, socket);
            break;
          }
        }
      }
    }
    return false;
  }

  public static setPlayers(players: any): void {
    Collision.players = players;
  }

  public static playerCollision(): boolean {
    if (Game.started && Killer.isKillerSet) {
      if (Collision.players) {
        for (var i in Collision.players) {
          if (!Collision.players[i].isKiller) {
            const collision: boolean = Collision.collision(
              Collision.players[i],
              Killer.killer
            );
            if (collision) {
              console.log('player collision');
              Killer.killer.kills++;
              Killer.killer.sessionKills++;
              Collision.players[i].repositionPlayer();
              return true;
            }
          }
        }
      }
    }
    return false;
  }

  public static collision(shape1: any, shape2: any): boolean {
    Collision.isCollision =
      shape1.x < shape2.x + shape2.width - 20 &&
      shape1.x + shape1.width > shape2.x &&
      shape1.y < shape2.y + shape2.height - 20 &&
      shape1.y + shape1.height > shape2.y;
    return Collision.isCollision;
  }
}
