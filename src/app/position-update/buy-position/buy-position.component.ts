import { Component, OnInit } from '@angular/core';
import {FormGroup,  FormBuilder, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { DateValidators } from '../../validators/date.validator';

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
      price:['', [Validators.required, Validators.pattern('^[0-9.]*$')]],
      date:['', [Validators.required, DateValidators.notFuture]],
      buyReason:['', Validators.required]
    });


  }

  saveBuyDetailForm(formValues){
    //formValues.patchValue({date: new Date(formValues.controls.date.value)});

    this.dataService.saveBuyForm(formValues).subscribe(
      data => {
        this.router.navigate(['home']);
      },
      err => {console.log(err.error.text);},
      () => {}
    )
  }

}
