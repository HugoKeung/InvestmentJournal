import { Component, OnInit, Input } from '@angular/core';
import {FormGroup,  FormControl, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { DateValidator } from '../../validators/date.validator';
import { MatchValidator } from '../../validators/match.validator';
import { StockService } from '../../services/stock.service';
import { FormTicker } from '../../model/formTicker.model';
import {Observable, of} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-buy-position',
  templateUrl: './buy-position.component.html',
  styleUrls: ['./buy-position.component.css']
})
export class BuyPositionComponent implements OnInit {
  positionForm: FormGroup;
  buy: boolean;
  allTickers : FormTicker[];
  filteredTickers: Observable<FormTicker[]>;
  tickerCheck: string[];
  loaded: boolean = false;
  searchChoice: boolean =true;

  constructor(private router:Router, private dataService: DataService, private fb:FormBuilder, private stockService: StockService) { }

  ngOnInit() {
    
        this.positionForm=this.fb.group({
          //validator for ticker will be already done on the autocomplete component
          ticker:['', [Validators.required]],
          price:['', [Validators.required, Validators.pattern('^[0-9.]*$')]],
          shares:['', [Validators.required, Validators.pattern('^[0-9]*$')]],
          date:['', [Validators.required, DateValidator.notFuture]],
          story:['', Validators.required],
          strength:['', Validators.required],
          weakness:['', Validators.required],
          opportunity:['', Validators.required],
          threat:['', Validators.required],
          userId:[localStorage.getItem('user_id')]
        }, {updateOn: 'blur'});
       

}
  saveBuyDetailForm(formValues){
    //formValues.patchValue({date: new Date(formValues.controls.date.value)});
    let fullName: string = this.positionForm.controls['ticker'].value;
    let ticker: string = fullName.substring(0, fullName.indexOf(':'));
    this.positionForm.controls['ticker'].setValue(ticker)
    this.dataService.saveBuyForm(formValues).subscribe(
      data => {

        this.router.navigate(['home']);
      },
      err => {console.log(err.error);},
      () => {}
    )
  }

  textChangeHandler(text: string){
    this.positionForm.controls['ticker'].setValue(text);
  }

  loadChangeHandler(status: boolean){
    this.loaded = status;
  }

}
