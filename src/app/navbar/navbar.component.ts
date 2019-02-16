import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '../../../node_modules/@angular/router';
import { Subscription } from 'rxjs';
import { ProfileService } from '../services/profile.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  profile: any;
  subscription: Subscription;
  constructor(private authService: AuthService, _router:Router, private profileService: ProfileService) {
    this.subscription = this.profileService.profileItem$.subscribe(profile => this.setProfile(profile))
   
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
