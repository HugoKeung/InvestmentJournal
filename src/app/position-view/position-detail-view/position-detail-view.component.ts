import { Component, OnInit, Input } from '@angular/core';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-position-detail-view',
  templateUrl: './position-detail-view.component.html',
  styleUrls: ['./position-detail-view.component.css']
})
export class PositionDetailViewComponent implements OnInit {
  @Input() position;
  loaded: boolean = false;
  companyDetail: any;
  constructor(private stockService: StockService) { }

  ngOnInit() {
    this.stockService.getCompanyDetail(this.position.ticker).subscribe(
      data =>{
        this.companyDetail = data;
      },
      err => {console.log(err)},
      ()=>{this.loaded = true;}
    )
  }

}
