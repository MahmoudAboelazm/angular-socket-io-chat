import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Conversation } from '../../types/Conversation';
import { Message } from '../../types/Message';
import { useLocalStorage } from '../../utils/useLocalStorage';

@Injectable({
  providedIn: 'root',
})
export class ConversationsService {
  conversations: Conversation[] = [];
  conversationsChange: Subject<Conversation[]> = new Subject<Conversation[]>();
  constructor() {
    this.conversationsChange.subscribe((value) => (this.conversations = value));
  }

  getConversationsFromLocalStorage() {
    this.conversationsChange.next(useLocalStorage('conversations') || []);
  }
  addConversation(ids: string[], message?: Message) {
    this.conversationsChange.next(
      useLocalStorage('conversations', [
        ...this.conversations,
        { ids, messages: message ? [message] : [] },
      ])
    );
  }
}
