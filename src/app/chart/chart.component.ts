import { Component, OnInit, AfterViewInit, AfterViewChecked, Input, ElementRef, ViewChild, ContentChild } from '@angular/core';
import { StockService } from '../services/stock.service';
import { ChartData } from '../model/ChartData.model';
import { Color, BaseChartDirective} from 'ng2-charts';
import { ChartDataSets, ChartOptions } from 'chart.js';

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
  public chartData:any[] = [];
  public chartCounter = 0;
  //set x axis label
  public date:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  
  public lineChartOptions:any = {
    responsive: true,
    pointRadius: 100,
    pointHoverRadius: 10
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
    
    let index = e.active[0]._index;
//use the date to get news
    console.log(this.date[index]);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
  constructor(private stockService: StockService, private el: ElementRef) { }
//TODO add latest price to 1m data.
  ngOnInit() {
    this.createChart(this.ticker, this.time);
  }
  ngAfterViewInit(){
  }
  createChart(ticker: string, time: string) : string{
    this.getChart(ticker, time);  
    return time;
  }

  getChart(ticker, time):any{
    let newChart = {data: [], label: ''}
    this.stockService.getChart(ticker, time).subscribe(
      (data: ChartData[])=>{
         
          let tempPrice = data.map(a => a.close);
          newChart.data = tempPrice;        
          newChart.label = this.ticker;
          this.date = data.map(a=> a.date);
         
      },
      err=>{console.error(err)},
      ()=>{
        let percentCharge = JSON.parse(JSON.stringify(newChart))
        this.convertPercentChart(percentCharge);
        this.insertChart(newChart);
      
        this.insertChart(percentCharge);  
      }
    );
  }
  insertChart(newChart){
    //first check for duplicates, if there are then overwrite it
    let pos = this.chartData.map(function (e){return e.label}).indexOf(newChart.label);
    
    if (pos==-1){
    
      this.chartData.push(newChart);
    }
    else this.chartData[pos]=newChart;
  }

  convertPercentChart(chart): any{
    let firstValue = chart.data[0];
    let newData = chart.data.map(x => ((x-firstValue)/firstValue)*100);
    chart.data = newData;
    chart.label = chart.label + 'p';
    return chart;
  }

  textChangeHandler(value: string){
    console.log(value);
  }

}
