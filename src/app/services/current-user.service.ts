import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';   

@Injectable()
export class CurrentUserService {
itemValue = new Subject<string>();

set currentUser(user) {
  this.itemValue.next(user);
  localStorage.setItem('userProfile', user);
}

get currentUser() {
  return localStorage.getItem('userProfile');
}
}