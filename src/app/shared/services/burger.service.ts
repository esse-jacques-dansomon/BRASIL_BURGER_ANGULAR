import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Burger} from "../models/burger";
import { Observable} from "rxjs";
import {Product} from "../models/product";

const API_URL=`${environment.api}/burgers`;

@Injectable({
   providedIn: 'root'
})
export class BurgerService {

   constructor(private http : HttpClient) { }
    header = new HttpHeaders(
      {
         'Content-Type': 'application/json',
         'Access-Control-Allow-Origin': '*',
         'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
         'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
      }
   );
    h = {headers: this.header};
   getBurgers() : Observable<Burger[]> {
      return this.http.get<Burger[]>(`${API_URL}`, this.h);
   }


   archiveBurger(burger: Product) : Observable<Burger> {
      return this.http.patch<Burger>(`${API_URL}/edit`, burger, this.h);
   }

   createBurger(burger: Burger) : Observable<Burger> {
      return this.http.post<Burger>(API_URL, burger);
   }

   updateBurger(burger: Burger) : Observable<Burger> {
      return this.http.put<Burger>(`${API_URL}/${burger.id}`, burger);
   }


}
