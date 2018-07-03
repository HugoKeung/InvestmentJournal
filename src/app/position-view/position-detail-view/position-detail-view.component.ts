import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-position-detail-view',
  templateUrl: './position-detail-view.component.html',
  styleUrls: ['./position-detail-view.component.css']
})
export class PositionDetailViewComponent implements OnInit {
  @Input() position;
  constructor() { }

  ngOnInit() {
  }

}
