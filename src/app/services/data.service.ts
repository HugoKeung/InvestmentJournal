import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { BuyPosition } from '../model/BuyPosition.model';
import { CurrentPosition } from '../model/CurrentPosition.model';
import { SimplePosition } from '../model/SimplePosition.model';
import { SellPosition } from '../model/SellPosition.model';
import { AuthService } from './auth.service';
import { MyHttpClientService } from './my-http-client.service';
import { ProfileService } from './profile.service';
import { Subscription, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  options: any;
  user_id: string;
  api_url: string;
  profileSubscription: Subscription;
  readySubscription: Subscription;
  ready = false;
  private readyItemSource = new BehaviorSubject<any>(0);
  readyItem$ = this.readyItemSource.asObservable();
  constructor(private http: MyHttpClientService, private profileService: ProfileService) { 
  
    // this.profileSubscription = this.profileService.profileItem$.subscribe(profile => {
    //   if(profile){
    //   console.log('data service: profile chagned')
    //   this.setApiUrl(profile);
    //   this.readyItemSource.next(true);
    //   }
    // })
  }

  setApiUrl(profile){
    
    this.user_id = profile.sub.split('|')[1];
  
    this.api_url = '/api/users/' + this.user_id;
  }

  saveBuyForm(formValue){
    let body = JSON.stringify(formValue.value);
    return this.http.post('api/positions/buy', body);
 
  }

  saveSellForm(formValue){
    let body = JSON.stringify(formValue.value);
    return this.http.post('api/positions/sell', body);

  }

  getCurrentPositions(){
    return this.http.get<CurrentPosition[]>('api/positions/current');
    //return this.http.get<CurrentPosition[]>('/api/users/no/positions/current/ticker/SPY');

  }

  getCurrentTickers(){
    return this.http.get<string[]>('api/positions/current/tickers');
  }

  getAll(){
    return this.http.get<SimplePosition[]>('api/positions/all');

  }

  getSingleBuyPosition(id: number){
    return this.http.get<BuyPosition>('api/positions/buy/' + id);
  }

  getSingleSellPosition(id: number){
    return this.http.get<SellPosition>('api/positions/sell/' + id);
  }

  getTickerPosition(ticker: string){
    return this.http.get<BuyPosition[]>('api/positions/current/ticker/' + ticker);
  }

}

//const options={ headers: new HttpHeaders({'Content-Type': 'application/json'})};