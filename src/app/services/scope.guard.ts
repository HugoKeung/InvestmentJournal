import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ScopeGuard implements CanActivate{

  constructor(public authService: AuthService, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const scopes = (route.data as any).expectedScopes;

    if (!this.authService.isAuthenticated() || !this.authService.userHasScopes(scopes)) {
      this.router.navigate(['/unauthorized']);
      return false;
    }
    return true;
  }
}

