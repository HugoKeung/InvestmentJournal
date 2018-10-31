import { CanActivate } from "../../../node_modules/@angular/router";
import { Injectable } from "../../../node_modules/@angular/core";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService){

    }
    canActivate(){
        if(this.authService.isAuthenticated()){
            return true;
        }
        else{
            this.authService.login();
        }
    }
}