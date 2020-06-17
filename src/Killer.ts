import { Player } from "./Player";
import { Canvas } from "./Canvas";

export interface Knife {
  exists: boolean;
  x: number;
  y: number;
  icon: string;
  width: number;
  height: number
}

export class Killer {
  public static killer: Player;
  public static icon: string = "./views/killer.png";
  public static knife: Knife = Killer.setKnife();
  public static isKillerSet: boolean = false;

  public static setKiller(killer: Player): Player {
    Killer.killer = killer;
    Killer.killer.isKiller = true;
    Killer.killer.image = Killer.icon;
    Killer.isKillerSet = true;
    return Killer.killer;
  }

  public static unsetKiller(): void {
    // player.isKiller = false;
    // player.image = player.getImage();
    // delete Killer.killer;
    // return player;
    Killer.killer.isKiller = false;
    Killer.killer.image = Player.getImage();
    Killer.isKillerSet = false;
  }

  public static setKnife(): Knife {
    console.log('setKnife');
    return {
      exists: true,
      x: Math.floor((Math.random() * Canvas.width / 2) % Canvas.width),
      y: Math.floor((Math.random() * Canvas.height / 2) % Canvas.height),
      icon: "./views/knife.png",
      width: 80,
      height: 61
    };
  }
}
