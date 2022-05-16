import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, map, Observable, Subscription, tap} from "rxjs";
import {User} from "../models/user";
import {Router} from "@angular/router";

const API_URL=`${environment.api}/auth`;

@Injectable({
   providedIn: 'root'
})
export class AuthenticatorService {

   CONST_TOKEN_REFRESH_KEY = 'refresh';
   CONST_TOKEN_ACCESS_KEY = 'access';

   private _isLoggedIn = new BehaviorSubject<boolean>(false);
   private _user = new BehaviorSubject<User>({} as User);
   public user$ = this._user.asObservable();
   isLoggedIn$ = this._isLoggedIn.asObservable();

   constructor(private http : HttpClient, private router : Router) {
      const token = localStorage.getItem(this.CONST_TOKEN_ACCESS_KEY);
      this._isLoggedIn.next(!!token);
   }

   login(login:String , password:String ): Observable<any>{
      let informs = {
         "login": login,
         "password": password
      }
      return  this.http.post<any>(`${API_URL}/login`, informs).pipe(
         tap(
            (res)=>{
               let user : User;
               user = res.user;
               let etat = user.role.toString() == "ROLE_ADMIN";
               if (etat){
                  localStorage.setItem(this.CONST_TOKEN_REFRESH_KEY, res.refresh);
                  localStorage.setItem(this.CONST_TOKEN_ACCESS_KEY, res.access);
                  this._isLoggedIn.next(true);
                  this._user.next(user);
                  this.redirectoDashoard();
               }
               else{
                  alert(`access non autoris`);
               }
            }
         )
      );
   }

   isLogged(): Observable<User>
   {
      let token = localStorage.getItem(this.CONST_TOKEN_ACCESS_KEY);
      if (token == '' || token == null){
         token ='';
      }
      const header = new HttpHeaders({
         'content-type': 'application/json',
         'Authorization': 'Bearer ' + token,
         'Accept': 'application/json'
      });
      return this.http.get<User>('http://127.0.0.1:5000/auth/token/valid', {headers: header, });
   }


   logout(): void {
      localStorage.removeItem(this.CONST_TOKEN_ACCESS_KEY);
      localStorage.removeItem(this.CONST_TOKEN_REFRESH_KEY);
      this._isLoggedIn.next(false);
      this.redirectToLogin();
   }

   redirectToLogin() {
      this.router.navigateByUrl('/login').then(r => console.log(r));
   }

   redirectoDashoard(){
      this.router.navigateByUrl('/dashboard')
   }

   getUser() {
      this.isLogged().subscribe(
         (res) => {
            this._user.next(res);
         }
      )
      return this._user.getValue();
   }

   setUser(user: User) {
      this._user.next(user);
   }
}
