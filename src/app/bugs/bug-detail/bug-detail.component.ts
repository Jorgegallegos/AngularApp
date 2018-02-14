import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { BugService } from '../../services/bug.service';

@Component({
  selector: 'app-bug-detail',
  templateUrl: './bug-detail.component.html',
  styleUrls: ['./bug-detail.component.css']
})
export class BugDetailComponent implements OnInit {

  bug : any ={};

  constructor(private _activateRoute:ActivatedRoute,private _router:Router,private _bugService:BugService) { }

  ngOnInit() {
    const param = this._activateRoute.snapshot.paramMap.get("id");
    if(param){
      this._bugService.
      getBug(Number(param)).subscribe(data=>{
        this.bug=data;
      },
      error=>{})
    }
  }

}
