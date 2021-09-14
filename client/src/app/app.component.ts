import { Component } from '@angular/core';
import { LoginService } from './services/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  userId: string = '';
  constructor(private login: LoginService) {
    this.userId = this.login.userId;
    this.login.userIdChanges.subscribe((value) => (this.userId = value));
  }

  ngOnInit(): void {
    this.login.loginWithId();
  }

  onLoginWithId(id: string) {
    this.login.loginWithId(id);
  }
}
