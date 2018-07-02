import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  saveBuyForm(formValue){
    let body = JSON.stringify(formValue.value);
 //   console.log(body);
    this.http.post('/api/positions/buy', body, options).subscribe();
 

  }

  saveSellForm(formValue){
    let body = JSON.stringify(formValue.value);
 //   console.log(body);

    return this.http.post('/api/positions/sell', body, options);

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