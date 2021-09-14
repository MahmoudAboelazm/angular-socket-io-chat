import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { getUniqueId } from '../../utils/idGenerator';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @Input() userId: string = '';
  @Output() onSubmitLogin: EventEmitter<string> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}
  onSubmit() {
    this.onSubmitLogin.emit(this.userId);
  }
  generateUserId() {
    this.userId = getUniqueId(5);
    this.onSubmit();
  }
}
