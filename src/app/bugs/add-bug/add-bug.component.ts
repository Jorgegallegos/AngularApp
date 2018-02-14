import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { BugService } from '../../services/bug.service';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-add-bug',
  templateUrl: './add-bug.component.html',
  styleUrls: ['./add-bug.component.css']
})
export class AddBugComponent implements OnInit {

  addBugForm : FormGroup;
  errorMessage : string='';

  constructor(private fb:FormBuilder,private _bugService:BugService,private _router:Router) { 

    this.addBugForm=this.fb.group({
      'title':['',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(120)])],
      'body':['',Validators.compose([Validators.required,Validators.maxLength(500)])],
      'isFixed':false,
      'stepsToReproduce':['',Validators.maxLength(250)],
      'severity':1
    });
  }

  save(){
    this._bugService.postBug(this.addBugForm.value).subscribe(data=>{
      //success message
      this._router.navigate(["/bugs/"]);

    },error=>{this.errorMessage})
  }
  ngOnInit() {
  }

}
