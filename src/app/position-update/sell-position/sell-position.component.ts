import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-sell-position',
  templateUrl: './sell-position.component.html',
  styleUrls: ['./sell-position.component.css']
})
export class SellPositionComponent implements OnInit {
  positionForm: FormGroup;
  buy: boolean;

  constructor(private router:Router, private dataService:DataService) { }

  ngOnInit() {
    
    let ticker = new FormControl('', Validators.required);
    let price = new FormControl();
    let date = new FormControl();
    let sellReason = new FormControl('',Validators.required);
    

    this.positionForm = new FormGroup({
      ticker: ticker,
      price: price,
      date: date,
      sellReason: sellReason,
      
    })

  }

  saveSellDetailForm(formValues){
  
    this.dataService.saveSellForm(formValues);
    this.router.navigate(['home']);

  }

}
