import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from "../../../node_modules/@angular/common/http";
import { AuthService } from "./auth.service";
import { Observable } from "../../../node_modules/rxjs";
import { Injectable } from "../../../node_modules/@angular/core";


@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private authService: AuthService){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //only send bearer header with access token if is talking to own API
   
        var accessToken = localStorage.getItem('access_token');
        const headers = req.headers.set('Authorization', 'Bearer ' + accessToken);
        const authReq = req.clone({headers});
        return next.handle(authReq);

    
    }


}