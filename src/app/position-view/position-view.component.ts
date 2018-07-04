import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { BuyPosition } from '../model/BuyPosition.model';



@Component({
  selector: 'app-position-view',
  templateUrl: './position-view.component.html',
  styleUrls: ['./position-view.component.css']
})
export class PositionViewComponent implements OnInit {
  public currentPositions : BuyPosition[];
  
  currentSort: string = 'time';
  constructor(private dataService:DataService) { }

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
function sortByHolding(p1: BuyPosition, p2: BuyPosition){
  return p2.price-p1.price;
}

function sortByTime(p1: BuyPosition, p2: BuyPosition){
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

function sortyByTicker(p1: BuyPosition, p2: BuyPosition){
  if (p1.ticker>p2.ticker){
    return 1;
  }
  else return -1;
}