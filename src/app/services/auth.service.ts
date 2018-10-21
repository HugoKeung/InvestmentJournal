import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserManager, User, WebStorageStateStore } from 'oidc-client';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // authenticated = false;
  private _userManager: UserManager;
  private _user: User;
  constructor(private http: HttpClient) { 
    var config = {
      //authority has to locate auth server, should be /uaa/oauth/authorize
      authority: 'http://localhost:9999/',
      client_id: 'acme',
      redirect_uri: 'http://localhost:4200',
      scope: 'openid projects-api profile',
      response_type: 'id_token token',
      post_logout_redirect_uri: 'http://localhost:4200?postLogout=true',
      userStore: new WebStorageStateStore({store: window.localStorage})
    };

    this._userManager = new UserManager(config);
    this._userManager.getUser().then(user => {
      if (user && !user.expired) {
        this._user = user;
      }
    });
  }

  login(): Promise<any> {
    return this._userManager.signinRedirect();
  }

  logout(): Promise<any>{
    return this._userManager.signoutRedirect();
  }

  isLoggedIn(): boolean{
    return this._user && this._user.access_token && !this._user.expired;
  }

  getAccessToken(): string {
    return this._user ? this._user.access_token : '';
  }
  signoutRedirectCallback(): Promise<any>{
    return this._userManager.signoutRedirectCallback();
  }

  
  // authenticate(){
  //   return this.http.get('user');
  // }

  // getAuthStatus(){
  //   return this.authenticated;
  // }

  // logout(){
  //   this.http.post('logout',{}).finally(()=>{
  //     this.authenticated = false;
  //   }).subscribe();
  // }

}
