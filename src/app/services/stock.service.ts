import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: HttpClient) { }

//API doocumentation here: https://iextrading.com/developer/docs/#stocks

  getPrice(ticker: string){
    return this.http.get<number>('https://api.iextrading.com/1.0/stock/' + ticker + '/price');
  }

  getCompanyDetail(ticker: string){
    return this.http.get('https://api.iextrading.com/1.0/stock/' + ticker + '/company');
  }

  getAllSupportedTicker(){
    return this.http.get('https://api.iextrading.com/1.0/ref-data/symbols?filter=symbol,name');
  }

  getDatChart(ticker: string){

  }

  getChart(ticker: string, duration: string){
    return this.http.get('https://api.iextrading.com/1.0/stock' + ticker + '/chart/' + duration);
  }
}
