import { Component, OnInit, Input } from '@angular/core';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-position-list-view',
  templateUrl: './position-list-view.component.html',
  styleUrls: ['./position-list-view.component.css']
})
export class PositionListViewComponent implements OnInit {
  @Input() position;
  currentPrice: number;
  currentHolding: number;
  profitToDate: number;
  constructor(private stockService: StockService) { }

  ngOnInit() {

    this.stockService.getPrice(this.position.ticker).subscribe(
      data=>{this.currentPrice = data},
      err=> {console.log(err)},
      ()=>{    
        this.currentHolding = this.position.shares * this.currentPrice;
        this.profitToDate = this.currentHolding - (this.position.shares * this.position.price);
      }
    )

  }

}
