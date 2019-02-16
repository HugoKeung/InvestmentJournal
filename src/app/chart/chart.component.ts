import { Component, OnInit, AfterViewInit, AfterViewChecked, Input, ElementRef, ViewChild, ContentChild } from '@angular/core';
import { StockService } from '../services/stock.service';
import { ChartData } from '../model/ChartData.model';
import { BaseChartDirective } from 'ng2-charts';

//TODO scrolling behaviour for chart when change time

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, AfterViewInit {
  @Input() ticker;
  time: string = '1m';

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
//see https://valor-software.com/ng2-charts/ for detail
  //set data point
  public openPrice:Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'}
  ];

  //set x axis label
  public date:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  
  public lineChartOptions:any = {
    responsive: true
  };

  //set colour of line
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;

  //set to line grpah
  public chartType:string = 'line';

//  @ViewChild('canvas')
//  canvas: ElementRef;
//  chart;
//  public context: CanvasRenderingContext2D;
      // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
  constructor(private stockService: StockService, private el: ElementRef) { }
//TODO add latest price to 1m data.
  ngOnInit() {
    this.getChart(this.time);
}
  ngAfterViewInit(){
 

  }
   getChart(time: string) : string{
    this.stockService.getChart(this.ticker, time).subscribe(
      (data: ChartData[])=>{
         
          let tempPrice = data.map(a => a.open);
          this.openPrice[0].data = tempPrice;
          this.openPrice[0].label = this.ticker;
          this.date = data.map(a=> a.date);
      },
      err=>{console.error(err)},
      ()=>{
        
      }
  );
  return time;
  }

}
