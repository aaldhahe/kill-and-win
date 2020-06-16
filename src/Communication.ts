import socketio from "socket.io";
import { Player } from "./Player";
import { Knife } from "./Killer";
import { Game } from "./Game";

export class Communication {
  private socket: SocketIOClient.Socket;
  constructor(socket: SocketIOClient.Socket) {
    this.socket = socket;
  }

  public sendName(name: string): void {
    this.socket.emit("name", name);
  }

  public sendPlayer(player: Player): void {
    this.socket.emit("initilizePlayer", player);
  }

  public stateChange(player: Player): void {
    this.socket.emit("gameStateChange", player);
  }

  public sendKnifeShape(knife: Knife): void {
    if (Game.started && knife.exists) {
      console.log(`sending knife shape: ${knife.exists}`);
      this.socket.emit("knifeCreated", knife);
    }
  }

  public sendKnifeCollision(): void {
      this.socket.emit('knifeCollision', {});
  }
}
