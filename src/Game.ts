export class Game {
  public static started: boolean = false;
  public static session: number;

  public static setGameStarted(): void {
    Game.started = true;
  }
}
