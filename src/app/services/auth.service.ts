import { Injectable, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';
import { Observable, Subject, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import 'rxjs/add/observable/timer';
import { ProfileService } from './profile.service';



@Injectable()
export class AuthService{

  // @Output() profileEmitter: EventEmitter<any> = new EventEmitter();  
  // @Output() userIdEmitter: EventEmitter<any> = new EventEmitter();  
  refreshSub: any;
  

  requestedScopes: string = 'openid user_id email profile read:history';

  auth0 = new auth0.WebAuth({
    clientID: 'PzsSdSlVxOfigs0LIADSGSt4bEDhjfiP',
    domain: 'hugokeung.eu.auth0.com',
    responseType: 'token id_token',
    audience: 'http://localhost:8080/api',
    redirectUri: 'http://localhost:4200/callback',
    scope: this.requestedScopes
  });
  constructor(public router: Router, private profileService: ProfileService) {

  }

  public login(): void {
    this.auth0.authorize();
  }

  get accessToken(): string {
    return localStorage.getItem('accessToken');
  }

  get idToken(): string {
    return localStorage.getItem('idToken');
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

    const scopes = authResult.scope || this.requestedScopes || '';
    // Set the time that the access token will expire at
    const expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    localStorage.setItem('accessToken', authResult.accessToken);
    localStorage.setItem('idToken', authResult.idToken);
    localStorage.setItem('expiresAt', JSON.stringify(expiresAt));
    localStorage.setItem('scopes', JSON.stringify(scopes));

    this.getProfile((err, profile)=>{
      this.profileService.changeProfile(profile);
    });
    this.scheduleRenewal();
    
}
 
  public getProfile(cb): void {
    // if (!localStorage.getItem('accessToken')) {
    //   throw new Error('Access Token must exist to fetch profile');
    // }
    if (localStorage.getItem('accessToken')){
      this.auth0.client.userInfo(localStorage.getItem('accessToken'), (err, profile) => {
        if (profile) {
          this.profileService.changeProfile(profile);
     
        }
        localStorage.setItem('user_id', profile.sub.split('|')[1]);
        localStorage.setItem('userProfile', JSON.stringify(profile));
        cb(err, profile);
      });
    }
  }

  public renewTokens(): void {
 
    this.auth0.checkSession({}, (err, authResult) => {
      
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.localLogin(authResult);
      } else if (err) {
//uncomment below so can auto logout

        // alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
        // this.logout();
        // this.router.navigate['/welcome'];
      }
    });
}
  public logout(): void {
    // Remove tokens and expiry time

    localStorage.removeItem('accessToken');
    localStorage.removeItem('idToken');
    localStorage.removeItem('expiresAt');
    localStorage.removeItem('userProfile');
    localStorage.removeItem('user_id');
    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn');
    this.unscheduleRenewal();
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    var expiresAt = parseInt(localStorage.getItem('expiresAt'), 10);
    var authenticated = new Date().getTime() < expiresAt;
    
    return new Date().getTime() < expiresAt;
  }
  
  // public getProfile(cb): void {
  //   let accessToken = localStorage.getItem('accessToken');
  //   if (accessToken === null) {
  //     throw new Error('Access Token must exist to fetch profile');
  //   }
  
  //   const self = this;
  //   this.auth0.client.userInfo(accessToken, (err, profile) => {
  //     if (profile) {
  //       self.userProfile = profile;
  //     }
  //     cb(err, profile);
  //   });
  // }



  public userHasScopes(scopes: Array<string>): boolean {
    const grantedScopes = JSON.parse(localStorage.getItem('scopes')).split(' ');
    return scopes.every(scope => grantedScopes.includes(scope));
  }

  public scheduleRenewal() {
    
    if (!this.isAuthenticated()) { return; }
    this.unscheduleRenewal();

    const expiresAt = parseInt(localStorage.getItem('expiresAt'), 10);

    const expiresIn$ = of(expiresAt).pipe(
      mergeMap(
        expiresAt => {
          const now = Date.now();
          // Use timer to track delay until expiration
          // to run the refresh at the proper time
          return Observable.timer(Math.max(1, expiresAt - now));
        }
      )
    );

    // Once the delay time from above is
    // reached, get a new JWT and schedule
    // additional refreshes
    this.refreshSub = expiresIn$.subscribe(
      () => {
        this.renewTokens();
        this.scheduleRenewal();
      }
    );
  }

  public unscheduleRenewal() {
    if (this.refreshSub) {
      this.refreshSub.unsubscribe();
    }
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