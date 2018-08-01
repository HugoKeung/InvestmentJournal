import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-position-list-view',
  templateUrl: './position-list-view.component.html',
  styleUrls: ['./position-list-view.component.css']
})
export class PositionListViewComponent implements OnInit, OnChanges {
  @Input() position;
  currentPrice: number;
  currentHolding: number;
  profitToDate: number;
  constructor(private stockService: StockService) { }

  ngOnInit() {


  }

  ngOnChanges(){
    this.currentHolding = this.position.shares * this.position.currentPrice;
    this.profitToDate = this.currentHolding + this.position.sellPrice - this.position.buyPrice;
    
  }

}
