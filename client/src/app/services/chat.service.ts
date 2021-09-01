import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private socket: Socket) {}

  sendMessage(msg: string, room: string) {
    this.socket.emit('message', msg, room);
  }
  joinRoom(room: string) {
    this.socket.emit('join-room', room, (message: string) => {
      console.log(message);
    });
  }
  getMessage() {
    this.socket.on('receive', (message: string) => {
      console.log(message);
    });
  }
}
