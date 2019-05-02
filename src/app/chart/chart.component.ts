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
  tickers: string[];
  time: string = '1m';
  valid: boolean = false;
  newInput: string;
  compare: boolean = false;
  @ViewChild(BaseChartDirective) private Chart: BaseChartDirective
//see https://valor-software.com/ng2-charts/ for detail
  //set data point
  public chartData:any[] = [];
  public chartCounter = 0;
  //set x axis label
  public date:Array<any> = [];
  loaded: boolean = false;

  
  public lineChartOptions:any = {
    responsive: true,
    pointRadius: 100,
    pointHoverRadius: 10
  };

  //set colour of line
  public lineChartColors:Array<any> = [  ];
  public lineChartLegend = true;

  //set to line grpah
  public chartType:string = 'line';

  public chartClicked(e:any):void {
    
    let index = e.active[0]._index;
//use the date to get news, to be implemented
    console.log(this.date[index]);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
  constructor(private stockService: StockService, private el: ElementRef) { }
//TODO add latest price to 1m data.
  ngOnInit() {
    this.tickers = [this.ticker];
    this.createChart(this.ticker, this.time);
  }
  ngAfterViewInit(){
  }

  createChart(ticker: string, time: string){ 
    this.getChart(ticker, time); 
  
  }

  createCharts(tickers: string[], time: string): string{
    tickers.forEach((ticker)=>{
      this.createChart(ticker, time);
    })
    return time;
  }

  getChart(ticker, time):any{
    let newChart = {data: [], label: ''}
    this.stockService.getChart(ticker, time).subscribe(
      (data: ChartData[])=>{
         
          let tempPrice = data.map(a => a.close);
          newChart.data = tempPrice;        
          newChart.label = ticker;
          this.date = data.map(a=> a.date);
         
      },
      err=>{console.error(err)},
      ()=>{
        let percentChart = JSON.parse(JSON.stringify(newChart))
        this.convertPercentChart(percentChart);
        this.insertChart(newChart);
        this.insertChart(percentChart);  
        this.loaded = true;
        if (this.compare){
          this.showPercentChartOnly();
        }
      
      }
    );
  }
  insertChart(newChart){
    //first check for duplicates, if there are then overwrite it
      let pos = this.chartData.map(function (e){return e.label}).indexOf(newChart.label);
    
    if (pos==-1){    
      this.chartData.push(newChart);
      //this.tickers.push(newChart.label);
    }
    else {
      this.chartData[pos]=newChart;
    }
  }

  convertPercentChart(chart): any{
    let firstValue = chart.data[0];
    let newData = chart.data.map(x => ((x-firstValue)/firstValue)*100);
    chart.data = newData;
    chart.label = chart.label + '%';
    chart.hidden = true;
    return chart;
  }

  textChangeHandler(value: string){
    this.newInput = value;
  }
  validChangeHandler(status: boolean){
    this.valid = status;
  }

  addCompare(){
    let ticker: string = this.newInput.substring(0, this.newInput.indexOf(':'));
    if (this.tickers.indexOf(ticker)==-1){
      this.tickers.push(ticker);
    }
    this.compare = true;
    this.createChart(ticker, this.time);

  }

  showPercentChartOnly(){
    this.chartData.forEach(function(chart){
      if (chart.label.slice(-1)!='%'){
        chart.hidden = true;
      }
      else chart.hidden = false;
    })
  }

  reset(){
    this.tickers = [];
    this.chartData=[];
    this.createChart(this.ticker, this.time);
    this.compare = false;
  }

}
