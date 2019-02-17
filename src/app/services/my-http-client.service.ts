import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MyHttpClientService {
  options;
  constructor(private http: HttpClient) { 
    this.options = {
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
    // let headers = new Headers();
    // headers.append('Content-Type': 'application/json')
    // headers.append('Authorization', `Bearer ` + localStorage.getItem('accessToken'));
    // let options = new RequestOptions({headers : headers});

    return this.http.post<T>(url, data, this.options);
  }
}
