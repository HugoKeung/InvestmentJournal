import { Component, OnInit } from '@angular/core';
import { SimplePosition } from '../model/SimplePosition.model';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  history : SimplePosition[];
  loaded : boolean = false;
  constructor(private dataService: DataService) { }
  
  ngOnInit() {
    this.dataService.getAll().subscribe(
      data=> {this.history = data;},
      err => {console.error(err);},
      ()=>{this.loaded = true;}
    )

  }

}
