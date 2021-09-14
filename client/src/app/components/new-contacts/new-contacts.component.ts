import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Contact } from '../../types/Contact';

@Component({
  selector: 'app-new-contacts',
  templateUrl: './new-contacts.component.html',
  styleUrls: ['./new-contacts.component.css'],
})
export class NewContactsComponent implements OnInit {
  @Input() contactId: string = '';
  @Input() contactName: string = '';
  @Output() onSubmitNewContact: EventEmitter<Contact> = new EventEmitter();
  @Output() onClose: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
  onSubmit() {
    if (!this.contactId || !this.contactName) {
      return alert('Please add Id and Name');
    }
    const newContact = {
      id: this.contactId,
      name: this.contactName,
    };

    this.onSubmitNewContact.emit(newContact);
  }
  close() {
    this.onClose.emit(false);
  }
}
