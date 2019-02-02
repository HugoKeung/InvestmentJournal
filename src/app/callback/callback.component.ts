import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {
  profile:any;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    // if (this.authService.userProfile) {
    //   this.profile = this.authService.userProfile;
    // } else {
    //   this.authService.getProfile((err, profile) => {
    //     this.profile = profile;
    //   });
    // }
  }

}
