import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MyHttpClientService {

  constructor(private http: HttpClient) { 
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
      })
    };
  }
  createAuthorizationHeader(headers: HttpHeaders) {
    headers.append('Authorization', 'Bearer ' +
      localStorage.getItem('accessToken'))
  }

  get<T>(url) {
 
    return this.http.get<T>(url, {
      headers: new HttpHeaders().set('Authorization', `Bearer ` + localStorage.getItem('accessToken'))
    });
  }

  post<T>(url, data) {
    return this.http.post<T>(url, data, { headers: new HttpHeaders({'Content-Type': 'application/json'})});
  }
}
