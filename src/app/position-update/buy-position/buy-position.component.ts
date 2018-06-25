import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-buy-position',
  templateUrl: './buy-position.component.html',
  styleUrls: ['./buy-position.component.css']
})
export class BuyPositionComponent implements OnInit {
  positionForm: FormGroup;
  buy: boolean;

  constructor(private router:Router) { }

  ngOnInit() {
    
    let ticker = new FormControl('', Validators.required);
    let price = new FormControl();
    let date = new FormControl();
    let buyReason = new FormControl('',Validators.required);
    

    this.positionForm = new FormGroup({
      ticker: ticker,
      price: price,
      date: date,
      buyReason: buyReason,
      
    })

  }

  saveBuyDetailForm(formValues){
    console.log(formValues);

    this.router.navigate(['home']);

  }

}
