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
  
  sortBy: string = 'time';
  constructor(private dataService:DataService) { }

  ngOnInit() {

    this.getPositions();
   
  }

  ngOnChanges(){
    if (this.sortBy==='time'){
      this.currentPositions.sort(sortByTime);
    }
    else if (this.sortBy==='holding'){
      this.currentPositions.sort(sortByHolding);
    }
    //if is sort by Ticker
    else {
      this.currentPositions.sort(sortyByTicker);
    }
  }

  //NEED TO TEST THIS BIT IF IT WORKS
  getPositions(){
    this.dataService.getCurrentPositions().subscribe(
      data => { this.currentPositions = data; },
      err => console.error(err),
      () => {}

    );
  }


}
function sortByHolding(p1: BuyPosition, p2: BuyPosition){
  return p1.price -p2.price;
}

function sortByTime(p1: BuyPosition, p2: BuyPosition){
  let p1Date = new Date(p1.date);
  let p2Date = new Date(p2.date);
  if (p1Date>p2Date){
    return -1;
  }
  else return 1;

}

function sortyByTicker(p1: BuyPosition, p2: BuyPosition){
  if (p1.ticker>p2.ticker){
    return 1;
  }
  else return -1;
}