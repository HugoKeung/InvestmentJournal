import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { SellPosition } from '../../../model/SellPosition.model';

@Component({
  selector: 'app-sell-position-expand-view',
  templateUrl: './sell-position-expand-view.component.html',
  styleUrls: ['./sell-position-expand-view.component.css']
})
export class SellPositionExpandViewComponent implements OnInit {
  position: SellPosition;
  loaded: boolean = false;;
  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');
    this.dataService.getSingleSellPosition(id).subscribe(
      data=>{this.position = data;},
      err=>{console.error(err)},
      ()=>{this.loaded = true;}
    )
  }

}
