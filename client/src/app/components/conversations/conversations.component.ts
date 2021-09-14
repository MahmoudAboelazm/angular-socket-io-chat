import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../../services/contacts/contacts.service';
import { ConversationsService } from '../../services/conversations/conversations.service';
import { MessagesService } from '../../services/messages/messages.service';
import { Contact } from '../../types/Contact';
import { Conversation } from '../../types/Conversation';
import { FormatedConversation } from '../../types/FormatedConversations';

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.css'],
})
export class ConversationsComponent implements OnInit {
  conversations: Conversation[] = [];
  formatedConversations: FormatedConversation[] = [];
  constacts: Contact[] = [];
  newConversation: boolean = false;
  constructor(
    private conversationsService: ConversationsService,
    private contactsService: ContactsService,
    private messagesService: MessagesService
  ) {
    this.conversations = this.conversationsService.conversations;
    this.conversationsService.conversationsChange.subscribe((value) => {
      this.conversations = value;
      this.getFormatedConversations();
    });

    this.constacts = this.contactsService.contacts;

    this.contactsService.contactsChange.subscribe(
      (value) => (this.constacts = value)
    );
  }

  ngOnInit() {
    this.conversationsService.getConversationsFromLocalStorage();
  }
  onAddConversation(ids: string[]) {
    if (ids.length === 0) return alert('Please select at least one contact!');
    this.conversationsService.addConversation(ids);
    this.newConversation = false;
    this.getFormatedConversations();
  }
  getFormatedConversations() {
    const users: FormatedConversation[] = this.conversations.map(
      (conversation) => {
        const names: string[] = [];
        conversation.ids.map((id: string) => {
          let contactFound = false;
          this.constacts.map((user: Contact) => {
            if (user.id === id) {
              contactFound = true;
              return names.push(user.name);
            }
            return;
          });
          if (!contactFound) names.push(id);
        });
        return { ...conversation, names };
      }
    );
    this.formatedConversations = users;
  }

  selectConversation(i: number) {
    this.messagesService.showMessages(i);
  }

  showNewConversation() {
    this.newConversation = true;
  }
  closeNewConversation() {
    this.newConversation = false;
  }
}
