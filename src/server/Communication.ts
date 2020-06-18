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

  public stateChange(players: any, socket: any): void {
    for (var i in players) {
      const sock: SocketIOClient.Socket = socket[i];
      sock.emit('gameStateChange', players);
    }
  }

  public sendKnifeShape(knife: Knife, players: any, socket: any): void {
    if (Game.started && knife.exists) {
      for(var i in players) {
        if (players[i].name !== '' && players[i].knifeSent) {
          continue;
        }
        console.log(`sending knife shape: ${knife.exists}`);
        const sock: SocketIOClient.Socket = socket[i];
        sock.emit("knifeCreated", knife);
        players[i].knifeSent = true;
      }
    }
  }

  public sendKnifeCollision(players: any, socket: any): void {
    for(var i in players) {
      const sock: SocketIOClient.Socket = socket[i];
      sock.emit('knifeCollision', {});
    }
  
  }

  public disconnect(player: Player): void {
    this.socket.emit('disconnect', player.id);
  }
}
