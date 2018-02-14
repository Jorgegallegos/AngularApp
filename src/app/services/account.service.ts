import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import * as CryptoJS from 'crypto-js';
import { tokenKey } from '@angular/core/src/view/util';
import { Itoken } from '../auth/itoken';


@Injectable()
export class AccountService {
  loginurl:string =  environment.apiUrl +'token';

  private key = CryptoJS.enc.Utf8.parse('7061737323313233');
  private iv = CryptoJS.enc.Utf8.parse('7061737323313233');

  constructor(private _http : HttpClient ) { }

  public doLogin(email:string,password:string) : Observable<any> {
    //subscribe
    let body = new URLSearchParams();
    body.set("grant_type","password");
    body.set("username",email);
    body.set("password",password);
    body.set("client_id","web");

    let options = {
      headers : new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
    };

    return this._http.post(this.loginurl,body.toString(),options)
    .do(data=>{
      var tokenString = JSON.stringify(data);
      var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(tokenString), 
      this.key,{
        keySize: 128/8,
        iv: this.iv,
        mode: CryptoJS.mode.CBC,padding: 
        CryptoJS.pad.Pkcs7});
      localStorage.setItem("token",encrypted);
      console.log(encrypted);
    })
    .catch(this.handleError);
  }

  public doLogOut(){
    localStorage.removeItem("token");
  }

    handleError(ex:HttpErrorResponse){
      return Observable.throw(ex.error.error_description);
    }

    public getToken():string{
      var currentSession = this.getCurrentSession();
      if(currentSession != null) {
        return currentSession.access_token;
      }
      else return null;
    }

    public getCurrentSession():Itoken {
      var token = localStorage.getItem('token');
      if (token == undefined) return null;
  
      var encrypted = token;
      var decrypted = CryptoJS.AES.decrypt(encrypted, this.key, {keySize: 128 / 8,iv: this.iv,mode: CryptoJS.mode.CBC,padding: CryptoJS.pad.Pkcs7})
      var tokenDecrypted = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
      return tokenDecrypted;
    }
}