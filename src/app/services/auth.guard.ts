import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  authenticated = false;
  constructor(private auth: AuthService){}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean 
  {

    this.auth.authenticate.subscribe(
      res=>{
        if(res['name']){
          this.authenticated = true;
        }
        else this.authenticated = false;
      }, ()=>{
        return this.authenticated;
      }
    );;
  }
}
