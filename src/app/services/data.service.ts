import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  saveBuyForm(formValue){
    this.http.post('/api/positions/buy', formValue.value, options).subscribe();
    console.log('save buy form');

  }

  saveSellForm(formValue){
    
    this.http.post('/api/positions/sell', formValue.value, options).subscribe();
    console.log('save sell form');
  }

  getCurrentPositions(){
    return this.http.get('/api/positions/buy');
    
  }

  getHistory(){

  }

  getSinglePosition(id: number){
    this.http.get('/api/positions/buy/' + id).subscribe();
  }



}

const options={ headers: new HttpHeaders({'Content-Type': 'application/json'})};