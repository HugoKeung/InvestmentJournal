import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { DateValidators } from '../../validators/date.validator';

@Component({
  selector: 'app-sell-position',
  templateUrl: './sell-position.component.html',
  styleUrls: ['./sell-position.component.css']
})
export class SellPositionComponent implements OnInit {
  positionForm: FormGroup;

  constructor(private router:Router, private dataService:DataService, private fb: FormBuilder) { }

  ngOnInit() {
    
    this.positionForm = this.fb.group({
      ticker:['', [Validators.required, Validators.maxLength(4)]],
      price:['', [Validators.required, Validators.pattern('^[0-9.]*$')]],
      date:['', [Validators.required, DateValidators.notFuture]],
      sellReason:['', Validators.required]
    })

  }

  saveSellDetailForm(formValues){
   // formValues.patchValue({date: new Date(formValues.controls.date.value)});
    this.dataService.saveSellForm(formValues).subscribe(
      data => {
        this.router.navigate(['home']);
      },
      err=>console.log(err.error.text)
    )

    
    



  }

}
