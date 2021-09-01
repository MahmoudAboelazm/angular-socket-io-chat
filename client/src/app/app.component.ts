import { Component } from '@angular/core';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'socket-io';
  chats: string[] = [];
  message: string = '';
  room: string = '';
  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.getMessage();
  }
  onSubmit() {
    this.chatService.sendMessage(this.message, this.room);
    this.message = '';
  }
  joinRoom() {
    this.chatService.joinRoom(this.room);
  }
}
