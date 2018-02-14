import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router/';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private _accountService:AccountService,private _router:Router){

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      if(this._accountService.getCurrentSession()==null){
        this._router.navigate(['/login']);
      }

    return true;
  }
}
