import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  api_url = environment.stock_url;
  constructor(private http: HttpClient) { }

//API doocumentation here: https://iextrading.com/developer/docs/#stocks

  getPrice(ticker: string){
    return this.http.get<number>(this.api_url + ticker + '/price');
  }

  getCompanyDetail(ticker: string){
    return this.http.get(this.api_url + ticker + '/company');
  }

  getAllSupportedTicker(){
    return this.http.get('https://api.iextrading.com/1.0/ref-data/symbols?filter=symbol,name');
  }


  getChart(ticker: string, duration: string){
    return this.http.get(this.api_url + ticker + '/chart/' + duration);
  }

  getFinancial(ticker: string){
    return this.http.get(this.api_url + ticker + '/financials');
  }

  getEarnings(ticker: string){
    return this.http.get(this.api_url + ticker + '/earnings');
  }

  getQuote(ticker: string){
    return this.http.get(this.api_url + ticker + '/quote');
  }
}
