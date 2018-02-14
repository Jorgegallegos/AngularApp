import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { modelGroupProvider } from '@angular/forms/src/directives/ng_model_group';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  model: any = {name: '', lastName: '', gender: true,photo:"https://angular.io/generated/images/marketing/home/code-icon.svg"};
  array: string[] = ["1","2","3","4","5"];

  myname: string = 'Jorge Gallegos';

  isLoading:boolean=false;

  clicked() {
    console.log(this.model.name);
    this.model.lastName = this.model.lastName + 'A';
  }

  addItem () {
    this.array.push("Another Item");
  }

  removeItem() {
    this.array.pop();
  }

  selectItem(item) {
    alert(item);
  }
  constructor() { }

  ngOnInit() {
  }

}
