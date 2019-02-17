import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { DataService } from '../services/data.service';
import { BuyPosition } from '../model/BuyPosition.model';
import { CurrentPosition } from '../model/CurrentPosition.model';
import { StockService } from '../services/stock.service';
import { SortService } from '../services/sort.service';
import { ScrollingVisibility } from '@angular/cdk/overlay';


@Component({
  selector: 'app-position-view',
  templateUrl: './position-view.component.html',
  styleUrls: ['./position-view.component.css']
})
export class PositionViewComponent implements OnInit {

  public currentPositions : CurrentPosition[];
  positionLoaded: boolean = false;
  
  currentSort: string = 'time';
  constructor(private dataService:DataService, private stockService: StockService, private sortService: SortService) { 
    this.authenticate();
    
  }

  ngOnInit() {
    // this.dataService.readySubscription = this.dataService.readyItem$.subscribe(ready=>{
    //  if(ready) {
    //    this.getPositions();
    //  }
    // })
    this.getPositions();
  }
  
  authenticate(){
    
  }

  getPositions(){
    this.dataService.getCurrentPositions().subscribe(
      data => { this.currentPositions = data; },
      err => console.error(err),
      () => {

        this.currentPositions.forEach(this.insertCurrentPrice.bind(this));
       
      }

    );
  }
  insertCurrentPrice(){
      let i=0;
      //put currentPrice into the model
      for (let position of this.currentPositions){
        this.stockService.getPrice(position.ticker).subscribe(
          data=>{position.currentPrice = data;},
          err=> {console.log(err)},
          ()=>{ 
        //count to make sure all prices are loaded before proceding to load the child components   
            i++;
            if (i===this.currentPositions.length){
              this.positionLoaded = true;
            }
          });
        
      }
  }



}


