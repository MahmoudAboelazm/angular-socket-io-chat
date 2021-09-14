import { Component, OnInit } from '@angular/core';
import { ContactsService } from 'src/app/services/contacts/contacts.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  activeKey: string = 'conversations';
  openNav: boolean = false;
  constructor(private contactsService: ContactsService) {}

  ngOnInit(): void {
    this.contactsService.getContactsFromLocalStorage();
  }

  setActiveKey(key: string) {
    this.activeKey = key;
  }
  setOpenNav() {
    this.openNav = !this.openNav;
  }
}
