import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { DateValidator } from '../../validators/date.validator';

@Component({
  selector: 'app-sell-position',
  templateUrl: './sell-position.component.html',
  styleUrls: ['./sell-position.component.css']
})
export class SellPositionComponent implements OnInit {
  positionForm: FormGroup;
  tickers: string[];
  @Input() user_id: string;
  constructor(private router:Router, private dataService:DataService, private fb: FormBuilder) { }

  ngOnInit() {
    this.dataService.getCurrentTickers().subscribe(data=>{this.tickers = data;}, err=>{console.log(err)}, ()=>{});
    this.positionForm = this.fb.group({
      ticker:['', Validators.required],
      price:['', [Validators.required, Validators.pattern('^[0-9.]*$')]],
      shares:['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      date:['', [Validators.required, DateValidator.notFuture]],
      sellReason:['', Validators.required],
      user_id:[this.user_id]
    })

  }

  saveSellDetailForm(formValues){
   // formValues.patchValue({date: new Date(formValues.controls.date.value)});
    this.dataService.saveSellForm(formValues).subscribe(
      data => {
        this.router.navigate(['home']);
      },
      err=>console.log(err.error.text)
    )

    
    



  }

}
