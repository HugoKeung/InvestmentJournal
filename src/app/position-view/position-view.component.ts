import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-position-view',
  templateUrl: './position-view.component.html',
  styleUrls: ['./position-view.component.css']
})
export class PositionViewComponent implements OnInit {
  public currentPositions;
  constructor(private dataService:DataService) { }

  ngOnInit() {
   //comment out for now to test
    // this.getPositions();
    this.currentPositions = [{"name": "name1"}, {"name": "name2"}];
  }
  getPositions(){
    this.dataService.getCurrentPositions().subscribe(
      data => { this.currentPositions = data; },
      err => console.error(err),
      () => console.log('positions loaded')

    );
  }



}
