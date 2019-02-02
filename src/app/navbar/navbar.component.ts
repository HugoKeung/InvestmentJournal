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

  constructor(private authService: AuthService, _router:Router) {
    
    authService.profileEmitter.subscribe(a => this.setProfile(a));
   
   }

  ngOnInit() {
    this.authService.getProfile((err, profile)=>{
    });
  }

  setProfile(profile){
    this.profile = profile;
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
