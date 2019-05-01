import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { startWith, map } from 'rxjs/operators';
import { StockService } from 'src/app/services/stock.service';
import { FormTicker } from 'src/app/model/formTicker.model';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatchValidator } from 'src/app/validators/match.validator';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit {
  @Output() textChange: EventEmitter<string> = new EventEmitter();
  @Output() loadChange: EventEmitter<boolean> = new EventEmitter();
  @Output() validChange: EventEmitter<boolean> = new EventEmitter();
  allTickers : FormTicker[];
  filteredTickers: Observable<FormTicker[]>;
  tickerCheck: string[];
  searchChoice: boolean =true;
  myControl = new FormControl();
  
  constructor(private stockService: StockService) { }

  ngOnInit() {
    this.stockService.getAllSupportedTicker().subscribe(
      (data : FormTicker[])=>{this.allTickers = data;},
      err=>{console.error(err);},
      ()=>{
        this.loadChange.emit(true);
        this.tickerCheck = this.allTickers.map(function (tickers){
          return tickers['symbol'] + ':' + tickers['name'];
        });

   
        this.myControl.setValidators([MatchValidator.inArray(this.tickerCheck)])
        this.filteredTickers = this.myControl.valueChanges.pipe(
        startWith(''), map(value => this._filter(value)));
  
      }
    );

}
  _filter(value: string): FormTicker[]{
    const filterValue = value.toUpperCase();
    var choice = this.searchChoice;
    return this.allTickers.filter(
      
      function(ticker){
        if (choice){
          return ticker.symbol.toUpperCase().startsWith(filterValue);
        }
        else return ticker.name.toUpperCase().includes(filterValue);
      }
    
    );
  }

  setSearchChoice(value){
    this.searchChoice = value;
    this.myControl.setValue('');
  }

  onChange(input){
      this.textChange.emit(input);
      this.validChange.emit(this.myControl.valid);
  }
}
