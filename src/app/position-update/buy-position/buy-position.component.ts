import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms'

@Component({
  selector: 'app-buy-position',
  templateUrl: './buy-position.component.html',
  styleUrls: ['./buy-position.component.css']
})
export class BuyPositionComponent implements OnInit {
  positionForm: FormGroup;
  buy: boolean;

  constructor() { }

  ngOnInit() {
    this.buy = true;
    let ticker = new FormControl('', Validators.required);
    let price = new FormControl();
    let date = new FormControl();
    let buyReason = new FormControl('',Validators.required);
    let sellReason = new FormControl('',Validators.required);

    this.positionForm = new FormGroup({
      ticker: ticker,
      price: price,
      date: date,
      buyReason: buyReason,
      sellReason: sellReason
    })

  }

  saveBuyDetailForm(formValues){
    console.log(formValues);

  }
  saveSellDetailForm(formValues){
    console.log('sell');
  }
}
