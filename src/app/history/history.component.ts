import { Component, OnInit } from '@angular/core';
import { SimplePosition } from '../model/SimplePosition.model';
import { DataService } from '../services/data.service';
import { SortService } from '../services/sort.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  history : SimplePosition[];
  loaded : boolean = false;
  currentSort : string = 'time';
  currentFilter: string = 'all';
  showList : SimplePosition[];
  constructor(private dataService: DataService, private sortService: SortService) { }
  
  ngOnInit() {

    this.dataService.getAll().subscribe(
      data=> {this.history = data;},
      err => {console.error(err);},
      ()=>{this.loaded = true;
        this.showList = this.history;
        this.currentSort = this.sortService.sortBy('time', this.history);}
    );

  }

  filterBy(filter: string){
    this.currentFilter = filter;
    if (filter === 'all'){
      this.showList = this.history;
    }
    else{
      this.showList = this.sortService.filterBy(filter, this.history);
    }

    this.sortBy(this.currentSort);
  }

  sortBy(sort: string){
    this.currentSort = sort;
    this.sortService.sortBy(sort, this.showList);
  }

}
