import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { BuyPosition } from '../../model/BuyPosition.model';

@Component({
  selector: 'app-position-expand-view',
  templateUrl: './position-expand-view.component.html',
  styleUrls: ['./position-expand-view.component.css']
})
export class PositionExpandViewComponent implements OnInit {
  position : BuyPosition;
  loaded: boolean;
  constructor(private route:ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
    console.log(this.loaded)
    let id = +this.route.snapshot.paramMap.get('id');
    this.dataService.getSinglePosition(id).subscribe(
      data=>{this.position = data;},
      err=>{console.log(err)},
      ()=>{this.loaded = true;}

    );
  }

}
