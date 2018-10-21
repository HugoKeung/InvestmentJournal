import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authenticated = false;
  constructor(private http: HttpClient) { }
  
  authenticate(){
    return this.http.get('user');
  }

  getAuthStatus(){
    return this.authenticated;
  }

  logout(){
    this.http.post('logout',{}).finally(()=>{
      this.authenticated = false;
    }).subscribe();
  }

}
