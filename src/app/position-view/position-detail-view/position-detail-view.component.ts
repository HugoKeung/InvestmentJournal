import { Component, OnInit, Input } from '@angular/core';
import { StockService } from '../../services/stock.service';
import { DataService } from '../../services/data.service';
import { BuyPosition } from '../../model/BuyPosition.model';

@Component({
  selector: 'app-position-detail-view',
  templateUrl: './position-detail-view.component.html',
  styleUrls: ['./position-detail-view.component.css']
})
export class PositionDetailViewComponent implements OnInit {
  @Input() position;
  loaded: boolean = false;
  financialLoaded: boolean = false;
  earningsLoaded: boolean = false;
  quoteLoaded: boolean = false;
  buyPositions: BuyPosition[];
  companyDetail: any;
  financials: any;
  earnings: any;
  quote: any;
  constructor(private stockService: StockService, private dataService: DataService) { }

  ngOnInit() {
  
    this.stockService.getCompanyDetail(this.position.ticker).subscribe(
      data =>{
        this.companyDetail = data;
      },
      err => {console.error(err)},
      ()=>{this.loaded = true;}
    )
    this.stockService.getFinancial(this.position.ticker).subscribe(
      (data: any)=>{
        //only show most recent financial
        this.financials = data.financials[0];
      },
      err =>{ console.error(err)},
      ()=>{

        this.financialLoaded = true;
      }
    )
    this.stockService.getEarnings(this.position.ticker).subscribe(
      (data: any)=>{
        //only show most recent financial
        this.earnings = data.earnings[0];
      },
      err =>{ console.error(err)},
      ()=>{
        this.earningsLoaded = true;
      }
    )
    this.stockService.getQuote(this.position.ticker).subscribe(
      (data: any)=>{
        //only show most recent financial
        this.quote = data;
      },
      err =>{ console.error(err)},
      ()=>{
        
        this.quoteLoaded = true;
      }
    )

    //TODO lazy loading, will do for now
    this.dataService.getTickerPosition(this.position.ticker).subscribe(
      data=>{ this.buyPositions = data;},
      err=> {console.error(err);},
      ()=>{}
    )
  }

}
