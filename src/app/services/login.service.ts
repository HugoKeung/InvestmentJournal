import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/finally'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
 // authenticated = false;
  constructor(private http: HttpClient, private router: Router) { }

  //send logout request to backend, then direct to login page
  logout(){
    // this.http.post('logout', {}).finally(()=>{
    //   this.authenticated = false;
    //   this.router.navigateByUrl('/login');
    // }).subscribe();

  }

  //make remote server call to see if user is authenticated
  //optional callback if succesful
  
  authenticate(credentials, callback){
  //   //send credential through http headers
  //   const headers = new HttpHeaders(credentials ? {
  //     authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password)
  //   } : {});

  //   this.http.get('api/user', {headers: headers}).subscribe(response => {
  //     if(response['name']){
  //       this.authenticated = true;
  //     } else {
  //       this.authenticated = false;
  //     }
  //     return callback && callback();
  //   });
   }

  //  getToken(){

  //   this.http.get('token').subscribe(data =>{
  //     const token = data['token'];
  //     this.http.get()
  //   })
  //  }
}
