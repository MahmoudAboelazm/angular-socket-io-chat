import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { useLocalStorage } from 'src/app/utils/useLocalStorage';
import { SocketIoService } from '../socketIo/socket-io.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  userId: string = '';
  userIdChanges: Subject<string> = new Subject<string>();
  constructor(private socketIo: SocketIoService) {
    this.userIdChanges.subscribe((value) => (this.userId = value));
  }

  loginWithId(id?: string) {
    const currentId = useLocalStorage('id', id);
    this.userIdChanges.next(currentId);
    if (currentId) this.socketIo.initSocket(currentId);
  }
}
