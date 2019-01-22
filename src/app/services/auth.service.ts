import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';
@Injectable()
export class AuthService {

  private _idToken: string;
  private _accessToken: string;
  private _expiresAt: number;
  userProfile: any;

  auth0 = new auth0.WebAuth({
    clientID: 'Sd9X7Bw15qDYndjFPNVeUUWZrkYyA2CP',
    domain: 'hugokeung.eu.auth0.com',
    responseType: 'token id_token',
    audience: 'http://localhost:8080/api',
    redirectUri: 'http://localhost:4200/callback',
    scope: 'openid profile read:history'
  });
  constructor(public router: Router) {
    this._idToken = '';
    this._accessToken = '';
    this._expiresAt = 0;
  }

  public login(): void {
    this.auth0.authorize();
  }

  get accessToken(): string {
    return this._accessToken;
  }

  get idToken(): string {
    return this._idToken;
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.localLogin(authResult);
        this.router.navigate(['/home']);
      } else if (err) {
        this.router.navigate(['/home']);
        console.log(err);
      }
    });
  }

  private localLogin(authResult): void {
    // Set isLoggedIn flag in localStorage
    localStorage.setItem('isLoggedIn', 'true');
    // Set the time that the access token will expire at
    const expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    this._accessToken = authResult.accessToken;
    this._idToken = authResult.idToken;
    this._expiresAt = expiresAt;
  }

  public renewTokens(): void {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.localLogin(authResult);
      } else if (err) {
        alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
        this.logout();
      }
    });
  }

  public logout(): void {
    // Remove tokens and expiry time
    this._accessToken = '';
    this._idToken = '';
    this._expiresAt = 0;
    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    return new Date().getTime() < this._expiresAt;
  }
  
  public getProfile(cb): void {
    if (!this._accessToken) {
      throw new Error('Access Token must exist to fetch profile');
    }
  
    const self = this;
    this.auth0.client.userInfo(this._accessToken, (err, profile) => {
      if (profile) {
        self.userProfile = profile;
      }
      cb(err, profile);
    });
  }

  // //called when calling back from auth0
  // public handleAuthentication(): void {
  //   this.auth0.parseHash((err, authResult) => {
  //     if (authResult && authResult.accessToken && authResult.idToken) {
  //       window.location.hash = '';
  //       this.setSession(authResult);
  //       this.router.navigate(['/admin']);
  //     } else if (err) {
  //       this.router.navigate(['/admin']);
  //       console.log(err);
  //     }
  //   });
  // }
  // private setSession(authResult): void {
  //   // Set the time that the access token will expire at
  //   const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
  //   //using localStorage, but can use cookie instead as well
  //   localStorage.setItem('access_token', authResult.accessToken);
  //   localStorage.setItem('id_token', authResult.idToken);
  //   localStorage.setItem('expires_at', expiresAt);
  // }
  // public logout(): void {
  //   // Remove tokens and expiry time from localStorage
  //   localStorage.removeItem('access_token');
  //   localStorage.removeItem('id_token');
  //   localStorage.removeItem('expires_at');
  //   // Go back to the home route
  //   this.router.navigate(['/']);
  // }
  // public isAuthenticated(): boolean {
  //   // Check whether the current time is past the
  //   // access token's expiry time
  //   const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
  //   return new Date().getTime() < expiresAt;
  // }
}