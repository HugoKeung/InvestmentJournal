import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-position-list-view',
  templateUrl: './position-list-view.component.html',
  styleUrls: ['./position-list-view.component.css']
})
export class PositionListViewComponent implements OnInit {
  @Input() position;
  constructor() { }

  ngOnInit() {
  }

}
