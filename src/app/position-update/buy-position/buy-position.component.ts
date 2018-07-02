import { Component, OnInit } from '@angular/core';
import {FormGroup,  FormBuilder, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-buy-position',
  templateUrl: './buy-position.component.html',
  styleUrls: ['./buy-position.component.css']
})
export class BuyPositionComponent implements OnInit {
  positionForm: FormGroup;
  buy: boolean;

  constructor(private router:Router, private dataService: DataService, private fb:FormBuilder) { }

  ngOnInit() {



    
    this.positionForm=this.fb.group({
      ticker:['', [Validators.required, Validators.maxLength(4)]],
      price:['', Validators.required],
      date:['', Validators.required],
      buyReason:['', Validators.required]
    });


  }

  saveBuyDetailForm(formValues){
    console.log(formValues.value);
    this.dataService.saveBuyForm(formValues);
    this.router.navigate(['home']);

  }

}
