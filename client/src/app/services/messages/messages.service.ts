import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from '../../types/Contact';
import { Conversation } from '../../types/Conversation';
import { Message } from '../../types/Message';
import { checkIfTwoArrEqual } from '../../utils/checkIfTwoArrEqual';
import { useLocalStorage } from '../../utils/useLocalStorage';
import { SocketIoService } from '../socketIo/socket-io.service';
import { LoginService } from '../login/login.service';
import { ContactsService } from '../contacts/contacts.service';
import { ConversationsService } from '../conversations/conversations.service';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  userId: string = '';
  contacts: Contact[] = [];
  conversations: Conversation[] = [];
  selectedConversationIndex: number | undefined;
  selectedConversation: Conversation = {} as Conversation;
  selectedConversationChange: Subject<Conversation> =
    new Subject<Conversation>();
  constructor(
    private socketIo: SocketIoService,
    private loginService: LoginService,
    private contactsService: ContactsService,
    private conversationsService: ConversationsService
  ) {
    this.selectedConversationChange.subscribe(
      (value) => (this.selectedConversation = value)
    );

    this.userId = loginService.userId;
    this.loginService.userIdChanges.subscribe((value) => (this.userId = value));

    this.contacts = this.contactsService.contacts;
    this.contactsService.contactsChange.subscribe(
      (value) => (this.contacts = value)
    );

    this.conversations = this.conversationsService.conversations;
    this.conversationsService.conversationsChange.subscribe(
      (value) => (this.conversations = value)
    );
  }

  recievedMessage() {
    this.socketIo.getMessage((recipients: any, text: any, sender: any) => {
      this.sendNewMessage(
        text as string,
        recipients as string[],
        sender as string
      );

      this.showMessages(this.selectedConversationIndex as number);
    });
  }
  showMessages(i: number) {
    if (typeof i === 'undefined') return;
    this.selectedConversationIndex = i;
    let conversation = this.conversations.filter((_, index) => index === i)[0];
    conversation.messages.map((message) => {
      if (message.sender === this.userId) {
        message.fromMe = true;
        return message;
      }
      let idx = this.contacts.filter((c) => c.id === message.sender);
      if (idx[0]) {
        message.name = idx[0].name;
        return message;
      }
      message.name = message.sender;
      return message;
    });
    this.selectedConversationChange.next(conversation);
  }
  addMessage(text: string, receivers: string[]) {
    this.socketIo.sendMessage(text, receivers);
    this.sendNewMessage(text, receivers, this.userId);
    this.showMessages(this.selectedConversationIndex as number);
  }
  sendNewMessage(text: string, receivers: string[], userId: string) {
    let conversationFound = false;

    const newMessage: Message = {
      sender: userId,
      text,
    };

    const newConversations = this.conversations.map((conversation) => {
      if (checkIfTwoArrEqual(conversation.ids, receivers)) {
        conversation.messages.push(newMessage);
        conversationFound = true;
      }
      return conversation;
    });

    if (conversationFound) {
      this.conversations = useLocalStorage('conversations', newConversations);
    } else {
      this.conversationsService.addConversation(receivers, newMessage);
    }
  }
}
