import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { BuyPosition } from '../model/BuyPosition.model';
import { CurrentPosition } from '../model/CurrentPosition.model';
import { SimplePosition } from '../model/SimplePosition.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  saveBuyForm(formValue){
    let body = JSON.stringify(formValue.value);
    console.log(body);
    return this.http.post('/api/positions/buy', body, options);
 

  }



  saveSellForm(formValue){
    let body = JSON.stringify(formValue.value);
 //   console.log(body);

    return this.http.post('/api/positions/sell', body, options);

  }

  getCurrentPositions(){
    return this.http.get<CurrentPosition[]>('/api/positions/current');
    
  }

  getCurrentTickers(){
    return this.http.get<string[]>('api/positions/current/tickers');
  }

  getAll(){

    return this.http.get<SimplePosition[]>('api/positions/all');

  }

  getSinglePosition(id: number){
    return this.http.get<BuyPosition>('/api/positions/buy/' + id);
  }

  getTickerPosition(ticker: string){
    return this.http.get<BuyPosition[]>('/api/positions/current/ticker/' + ticker);
  }




}

const options={ headers: new HttpHeaders({'Content-Type': 'application/json'})};