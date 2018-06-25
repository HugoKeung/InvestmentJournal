import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-collapsible-well',
  templateUrl: './collapsible-well.component.html',
  styleUrls: ['./collapsible-well.component.css']
})
export class CollapsibleWellComponent implements OnInit {

  constructor() { }
  visible:boolean=false;

  ngOnInit() {
  }


  toggleContent(){

    this.visible=!this.visible;

  }

}
