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
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  options: any;
  user_id: string;
  api_url = environment.data_url;
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

  // setApiUrl(profile){
    
  //   this.user_id = profile.sub.split('|')[1];
  
  //   this.api_url = '/api/users/' + this.user_id;
  // }

  saveBuyForm(formValue){

    let body = JSON.stringify(formValue.value);
    console.log(body);
    return this.http.post(this.api_url+'buy', body);
 
  }

  saveSellForm(formValue){
    let body = JSON.stringify(formValue.value);
    return this.http.post(this.api_url+'sell', body);

  }

  getCurrentPositions(){
    return this.http.get<CurrentPosition[]>(this.api_url+'current');

  }

  getCurrentTickers(){
    return this.http.get<string[]>(this.api_url+'current/tickers');
  }

  getAll(){
    return this.http.get<SimplePosition[]>(this.api_url+'all');

  }

  getSingleBuyPosition(id: number){
    return this.http.get<BuyPosition>(this.api_url+'buy/' + id);
  }

  getSingleSellPosition(id: number){
    return this.http.get<SellPosition>(this.api_url+'sell/' + id);
  }

  getTickerPosition(ticker: string){
    return this.http.get<BuyPosition[]>(this.api_url+'current/ticker/' + ticker);
  }

}

//const options={ headers: new HttpHeaders({'Content-Type': 'application/json'})};