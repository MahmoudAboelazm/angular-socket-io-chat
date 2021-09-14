import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  userId: string = '';
  constructor(private login: LoginService) {
    this.userId = this.login.userId;
    this.login.userIdChanges.subscribe((value) => (this.userId = value));
  }

  ngOnInit(): void {}
}
