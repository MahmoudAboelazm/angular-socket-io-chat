import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ContactsService } from 'src/app/services/contacts/contacts.service';
import { Contact } from '../../types/Contact';

@Component({
  selector: 'app-new-conversation',
  templateUrl: './new-conversation.component.html',
  styleUrls: ['./new-conversation.component.css'],
})
export class NewConversationComponent implements OnInit {
  @Input() checkedIds: string[] = [];
  contacts: Contact[] = [];
  @Output() onSubmitIds: EventEmitter<string[]> = new EventEmitter();
  @Output() onClose: EventEmitter<boolean> = new EventEmitter();
  constructor(private contactsService: ContactsService) {
    this.contacts = this.contactsService.contacts;
    this.contactsService.contactsChange.subscribe(
      (value) => (this.contacts = value)
    );
  }

  ngOnInit(): void {}

  checkId(id: string) {
    if (!this.checkedIds.includes(id)) {
      this.checkedIds.push(id);
    } else {
      this.checkedIds = this.checkedIds.filter((i) => i !== id);
    }
  }
  onSubmit() {
    this.onSubmitIds.emit(this.checkedIds);
    this.checkedIds = [];
  }
  close() {
    this.onClose.emit();
  }
}
