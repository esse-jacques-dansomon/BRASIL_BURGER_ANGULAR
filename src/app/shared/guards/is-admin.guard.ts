import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, tap} from 'rxjs';
import {AuthenticatorService} from "../services/authentificator.service";
import {state} from "@angular/animations";

@Injectable({
  providedIn: 'root'
})


export class IsAdminGuard implements CanActivate {
   constructor(private authService: AuthenticatorService, private router: Router) {}
  canActivate(
   route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
     Observable<boolean |
        UrlTree> |
     Promise<boolean |
        UrlTree> |
     boolean |
     UrlTree {
    return this.authService.isLoggedIn$.pipe(
       tap(isLoggedIn => {
         if (!isLoggedIn) {
           this.router.navigateByUrl('/login').then(r => {
             console.log('navigation to login');
           });
         }
       })

    );
  }

}
