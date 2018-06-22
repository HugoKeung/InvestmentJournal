import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms'

@Component({
  selector: 'app-buy-position',
  templateUrl: './buy-position.component.html',
  styleUrls: ['./buy-position.component.css']
})
export class BuyPositionComponent implements OnInit {
  buyDeatail: FormGroup;
  ticker: FormControl;
  price: FormControl;
  date: FormControl;


  constructor() { }

  ngOnInit() {
    this.buyDeatail = new FormGroup({

    })
  }

}
