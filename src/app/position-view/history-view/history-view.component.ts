import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-history-view',
  templateUrl: './history-view.component.html',
  styleUrls: ['./history-view.component.css']
})
export class HistoryViewComponent implements OnInit {
  @Input() position;
  flag: string;
  id: number;

  constructor() { }

  ngOnInit() {
    
    this.flag = this.position.flag;
    this.id = this.position.id;
  }

}
