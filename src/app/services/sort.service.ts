import { Injectable } from '@angular/core';
import { StockService } from './stock.service';

@Injectable({
  providedIn: 'root'
})
export class SortService {
  test: number = 1;
  constructor(private stockService: StockService) { }

  filterBy(flag: string, array: Array<any>){
    let newList : any[] = [];

    array.forEach((position)=>{
      if(position.flag === flag){
        newList.push(position);
      }
    })

    return newList;
  }

  sortBy(sort: string, array: Array<any>){
     
    switch(sort){
      case "time":{
        array.sort(sortByTime);
        return 'time';

      }
      case "ticker":{
        array.sort(sortyByTicker);
        return 'ticker';

      }
      //Holding not working yet, to be implemented
      case "holding":{

        array.sort(sortByHolding);
        return 'holding';
      }

      case "transaction":{
        array.sort(sortByTransaction);
        return 'transaction';
      }
      default:{
        //do nothing
        break;
      }
    }

    function sortByTransaction(p1: any, p2: any){
      let p1Transaction = p1.shares * p1.price;
      let p2Transaction = p2.shares * p2.price;

      if (p2Transaction>p1Transaction){
        return 1;
      }
      else if (p2Transaction<p1Transaction){
        return -1;
      }
      else return 0;

      
    }

    function sortByHolding(p1: any, p2: any){
      
      let p1Holding = p1.currentPrice*p1.shares;
      let p2Holding = p2.currentPrice*p2.shares;
     
      if (p2Holding>p1Holding){
        return 1;
       }
      else if (p2Holding<p1Holding){
       return -1;
      }
      else return 0;
      
    }

    function sortyByTicker(p1: any, p2: any){
      if (p1.ticker>p2.ticker){
        return 1;
      }
      else if (p1.ticker<p2.ticker){
        return -1;
      }
      else return 0;
    }
    function sortByTime(p1: any, p2: any){
      let p1Date = new Date(p1.date);
      let p2Date = new Date(p2.date);
  
      if (p1Date>p2Date){
        return -1;
      }
      else if (p1Date<p2Date){
        return 1;
      }
      else return 0;
  
    }

  }
}
