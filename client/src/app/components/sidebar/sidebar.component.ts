import { Component, OnInit } from '@angular/core';
import { ContactsService } from 'src/app/services/contacts/contacts.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  activeKey: string = 'conversations';
  openNav: boolean = false;
  userId: string = '';
  constructor(
    private contactsService: ContactsService,
    private loginService: LoginService
  ) {
    this.userId = this.loginService.userId;
    this.loginService.userIdChanges.subscribe((value) => (this.userId = value));
  }

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
