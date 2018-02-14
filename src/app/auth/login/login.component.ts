import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router  } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading:boolean=false;
  model:any={email:'',password:''};
  errorMessage:string;

  constructor(private _accountService:AccountService,private _router:Router) { }

  ngOnInit() {
    /*var token = this._accountService.getToken();
    console.log(token);*/
  }

  submitForm(loginForm) { 
    this.isLoading = true;
    this._accountService.doLogin(this.model.email, this.model.password)
    .subscribe(data=>{/*redirect*/
       this.isLoading=false;
       this.errorMessage=""; 
       this._router.navigate([("/welcome")])},

    error=>{
      this.errorMessage=error;
    });
  }

}
