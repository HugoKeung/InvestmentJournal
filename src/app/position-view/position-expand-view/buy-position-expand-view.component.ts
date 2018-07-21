import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { BuyPosition } from '../../model/BuyPosition.model';

@Component({
  selector: 'app-buy-position-expand-view',
  templateUrl: './buy-position-expand-view.component.html',
  styleUrls: ['./buy-position-expand-view.component.css']
})
export class BuyPositionExpandViewComponent implements OnInit {
  position : BuyPosition;
  loaded: boolean;
  constructor(private route:ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
    
    let id = +this.route.snapshot.paramMap.get('id');
    this.dataService.getSingleBuyPosition(id).subscribe(
      data=>{this.position = data;},
      err=>{console.log(err)},
      ()=>{this.loaded = true;}

    );
  }

}
