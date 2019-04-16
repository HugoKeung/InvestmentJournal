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
    

    this.stockService.getAllSupportedTicker().subscribe(
      (data : FormTicker[])=>{this.allTickers = data;},
      err=>{console.error(err);},
      ()=>{
        this.tickerCheck = this.allTickers.map(function (tickers){
          return tickers['symbol'] + ':' + tickers['name'];
        });
        this.positionForm=this.fb.group({
          ticker:['', [Validators.required, MatchValidator.inArray(this.tickerCheck)]],
          price:['', [Validators.required, Validators.pattern('^[0-9.]*$')]],
          shares:['', [Validators.required, Validators.pattern('^[0-9]*$')]],
          date:['', [Validators.required, DateValidator.notFuture]],
          story:['', Validators.required],
          strength:['', Validators.required],
          weakness:['', Validators.required],
          opportunity:['', Validators.required],
          threat:['', Validators.required],
          userId:[localStorage.getItem('user_id')]
        });
        this.loaded = true;
        this.filteredTickers = this.positionForm.get('ticker').valueChanges.pipe(
          startWith(''), map(value => this._filter(value)));
          
      }
    );

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
      err => {console.log(err.error.text);},
      () => {}
    )
  }
  //slice it here
   _filter(value: string): FormTicker[]{
    const filterValue = value.toUpperCase();
    var choice = this.searchChoice;
    return this.allTickers.filter(
      
      function(ticker){
        if (choice){
          return ticker.symbol.toUpperCase().includes(filterValue);
        }
        else return ticker.name.toUpperCase().includes(filterValue);
      }
    
    );
  }

  setSearchChoice(value){
    this.searchChoice = value;
    this.positionForm.controls['ticker'].setValue('');
  }

}
