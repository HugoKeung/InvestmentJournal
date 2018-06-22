import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-sell-position',
  templateUrl: './sell-position.component.html',
  styleUrls: ['./sell-position.component.css']
})
export class SellPositionComponent implements OnInit {
  sellDetail : FormGroup;
  ticker : FormControl;
  price : FormControl;
  date: FormControl;

  constructor() { }

  ngOnInit() {
    this.sellDetail = new FormGroup({
      
    })
  }

}
