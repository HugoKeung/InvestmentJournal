import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sell-position',
  templateUrl: './sell-position.component.html',
  styleUrls: ['./sell-position.component.css']
})
export class SellPositionComponent implements OnInit {
  sellDetailForm : FormGroup;
  ticker : FormControl;
  price : FormControl;
  date: FormControl;

  constructor() { }

  ngOnInit() {
    let ticker = new FormControl('', Validators.required);
    let price = new FormControl();
    let date = new FormControl();

    this.sellDetailForm = new FormGroup({
      ticker: ticker,
      price: price,
      date: date
    })
  }

}
