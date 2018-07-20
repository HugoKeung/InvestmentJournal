import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { BuyPosition } from '../model/BuyPosition.model';
import { CurrentPosition } from '../model/CurrentPosition.model';
import { StockService } from '../services/stock.service';
import { SortService } from '../services/sort.service';




@Component({
  selector: 'app-position-view',
  templateUrl: './position-view.component.html',
  styleUrls: ['./position-view.component.css']
})
export class PositionViewComponent implements OnInit {
  public currentPositions : CurrentPosition[];
  
  currentSort: string = 'time';
  constructor(private dataService:DataService, private stockService: StockService, private sortService: SortService) { }

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

}


