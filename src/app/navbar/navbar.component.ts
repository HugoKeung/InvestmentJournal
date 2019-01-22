import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  profile: any;

  constructor(private authService: AuthService, private _router:Router) {

   }

  ngOnInit() {
    if (this.authService.userProfile) {
      this.profile = this.authService.userProfile;
    } else {
      this.authService.getProfile((err, profile) => {
        this.profile = profile;
      });
    }
  }
  logout(){
    this.authService.logout();
  }

  login(){
    this.authService.login();
  }

  authenticated(){
    return this.authService.isAuthenticated();
  }


}
