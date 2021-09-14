import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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
  conversationSelected: boolean = false;

  constructor(private messagesService: MessagesService) {
    this.conversation = this.messagesService.selectedConversation;
    this.messagesService.selectedConversationChange.subscribe((value) => {
      this.conversation = value;
    });

    const idx = this.messagesService.selectedConversationIndex;
    if (typeof idx === 'number') this.conversationSelected = true;
    this.messagesService.selectedConversationIndexChange.subscribe((value) => {
      if (typeof value === 'number') this.conversationSelected = true;
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
