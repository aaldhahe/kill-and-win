export class Game {
  public static started: boolean = false;
  public static session: number;

  public static isGameStarted(players: any): void {
    if (Object.keys(players).length >= 2) {
      Game.started = true;
    } else {
      Game.started = false;
    }  
  }
}
