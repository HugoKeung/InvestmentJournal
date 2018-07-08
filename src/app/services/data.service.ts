import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { BuyPosition } from '../model/BuyPosition.model';

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
    return this.http.get<BuyPosition[]>('/api/positions/buy');
    
  }

  getCurrentTickers(){
    return this.http.get<string[]>('api/positions/buy/tickers');
  }

  getHistory(){

  }

  getSinglePosition(id: number){
    return this.http.get<BuyPosition>('/api/positions/buy/' + id);
  }



}

const options={ headers: new HttpHeaders({'Content-Type': 'application/json'})};