import { Component, Input, OnInit } from '@angular/core';
import { MessagesService } from '../../services/messages/messages.service';
import { Conversation } from '../../types/Conversation';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  @Input() message: string = '';
  conversation: Conversation = {} as Conversation;

  constructor(private messagesService: MessagesService) {
    this.conversation = this.messagesService.selectedConversation;
    this.messagesService.selectedConversationChange.subscribe((value) => {
      this.conversation = value;
    });
  }

  ngOnInit(): void {
    this.messagesService.recievedMessage();
  }

  onSubmit() {
    this.messagesService.addMessage(this.message, this.conversation.ids);
    this.message = '';
  }
}
