import { Component, OnInit } from '@angular/core';
import { BugService } from '../../services/bug.service';
import { error } from 'util';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bug-list',
  templateUrl: './bug-list.component.html',
  styleUrls: ['./bug-list.component.css']
})
export class BugListComponent implements OnInit {

  bugs : any[]=[];
  bugEdit = {};
  errorMessage:string;
  constructor(private _bugsService:BugService,private _router:Router) { }

  ngOnInit() {

    this._bugsService.getBugs().subscribe(data=>
    {
      this.bugs = data;
    },
     error=>{console.log(error);})
  }

  editBug(bug:any){
    console.log(bug);
    this.bugEdit = bug;
  }

  updateBug(bug:any){

    console.log(bug);
    this._bugsService.putBug(bug).subscribe(data=>{
      //success message
      this._router.navigate(["/bugs/"]);

    },error=>{this.errorMessage})
  }

}
