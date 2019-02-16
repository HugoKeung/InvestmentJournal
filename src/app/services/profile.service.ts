import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private profileItemSource = new BehaviorSubject<any>(0);
  profileItem$ = this.profileItemSource.asObservable();
  changeProfile(profile){
    this.profileItemSource.next(profile);
  }
  constructor() { }

  
}
