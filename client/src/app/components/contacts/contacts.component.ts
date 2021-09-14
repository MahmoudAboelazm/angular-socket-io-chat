import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../../services/contacts/contacts.service';
import { Contact } from '../../types/Contact';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit {
  contacts: Contact[] = [];
  newContact: boolean = false;

  constructor(private contactsService: ContactsService) {
    this.contacts = contactsService.contacts;
    this.contactsService.contactsChange.subscribe(
      (value) => (this.contacts = value)
    );
  }

  ngOnInit(): void {}
  onCreateContact(newContact: Contact) {
    this.newContact = false;
    this.contactsService.createContact(newContact);
  }
  showNewContact() {
    this.newContact = true;
  }
  closeNewContact() {
    this.newContact = false;
  }
}
