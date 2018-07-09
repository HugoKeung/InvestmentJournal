import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { BuyPosition } from '../model/BuyPosition.model';
import { CurrentPosition } from '../model/CurrentPosition.model';
import { StockService } from '../services/stock.service';




@Component({
  selector: 'app-position-view',
  templateUrl: './position-view.component.html',
  styleUrls: ['./position-view.component.css']
})
export class PositionViewComponent implements OnInit {
  public currentPositions : CurrentPosition[];
  
  currentSort: string = 'time';
  constructor(private dataService:DataService, private stockService: StockService) { }

  ngOnInit() {

    this.getPositions();
   
  }

  getPositions(){
    this.dataService.getCurrentPositions().subscribe(
      data => { this.currentPositions = data; },
      err => console.error(err),
      () => {}

    );
  }

  sortBy(sort: string){
    this.currentSort = sort;
    
    switch(sort){
      case "time":{
        this.currentPositions.sort(sortByTime);
        break;
      }
      case "ticker":{
        this.currentPositions.sort(sortyByTicker);
        break;
      }
      case "holding":{
        this.currentPositions.sort(sortByHolding);
        break;
      }
      default:{
        //do nothing
        break;
      }
    }
    
  }


}


  //below is sorting function
  function sortByHolding(p1: CurrentPosition, p2: CurrentPosition){
    // let p1Price = stockService.getPrice(p1.ticker);
    // let p2Price = stockService.getPrice(p2.ticker);
    let p1Price = 10;
    let p2Price = 10;
  //!!change p1.price to currentPrice
  let p1Holding = p1Price*p1.shares;
  let p2Holding = p2Price*p2.shares;

  return p2Holding-p1Holding;
}

function sortByTime(p1: CurrentPosition, p2: CurrentPosition){
  let p1Date = new Date(p1.date);
  let p2Date = new Date(p2.date);

  if (p1Date>p2Date){
    return -1;
  }
  else if (p1Date<p2Date){
    return 1;
  }
  else return 0;

}

function sortyByTicker(p1: CurrentPosition, p2: CurrentPosition){
  if (p1.ticker>p2.ticker){
    return 1;
  }
  else return -1;
}
