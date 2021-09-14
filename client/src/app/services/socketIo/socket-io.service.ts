import { Injectable } from '@angular/core';
import socketIo, { Socket } from 'socket.io-client';
const SERVER_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class SocketIoService {
  private socket: Socket = {} as Socket;

  constructor() {}

  initSocket(id: string): void {
    this.socket = socketIo(SERVER_URL, { query: { id } });
  }

  sendMessage(text: string, recipients: string[]) {
    this.socket.emit('send-message', { recipients, text });
  }

  getMessage(FnCb: Function) {
    return this.socket.on(
      'receive-message',
      ({ recipients, text, sender }: any) => FnCb(recipients, text, sender)
    );
  }
}
