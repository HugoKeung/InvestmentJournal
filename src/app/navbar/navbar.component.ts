import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService, private _router:Router) {
   }

  ngOnInit() {
    // if (window.location.href.indexOf('?postLogout=true')> 0){
    //   this.authService.signoutRedirectCallback().then(()=>{
    //     let url: string = this._router.url.substring(0, this._router.url.indexOf('?'));
    //     this._router.navigateByUrl(url);

    //   });
    // }
  }
  logout(){
    this.authService.logout();
  }

  login(){
    this.authService.login();
  }


}
