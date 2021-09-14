import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from '../../types/Contact';
import { useLocalStorage } from '../../utils/useLocalStorage';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  contactsChange: Subject<Contact[]> = new Subject<Contact[]>();
  contacts: Contact[] = [];
  constructor() {
    this.contactsChange.subscribe((value) => (this.contacts = value));
  }

  getContactsFromLocalStorage() {
    this.contactsChange.next(useLocalStorage('contacts') || []);
  }

  createContact(newContact: Contact) {
    this.contactsChange.next(
      useLocalStorage('contacts', [...this.contacts, newContact])
    );
  }
}
