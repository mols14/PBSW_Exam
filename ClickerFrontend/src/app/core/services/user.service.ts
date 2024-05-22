import { Injectable } from '@angular/core';
import { User } from '../../core/models/user.model';
import { Upgrade } from '../../core/models/upgrade.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User;

  constructor() {
    this.user = new User(0, [
      new Upgrade(1, 'assets/upgrade.png', 'Upgrade 1', 'Increases score per click by 1', 0, 10),
      new Upgrade(2, 'assets/upgrade.png', 'Upgrade 2', 'Increases score per click by 10', 0, 100),
      new Upgrade(3, 'assets/upgrade.png', 'Upgrade 3', 'Increases score per click by 30', 0, 1000)
    ]);
  }

  getUser() {
    return this.user;
  }

  updateUser(user: User) {
    this.user = user;
  }
}
