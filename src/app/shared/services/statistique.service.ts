import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Statistique} from "../models/statistique";
import {Observable} from "rxjs";
const API_URL=`${environment.api}/statistiques`;

@Injectable({
  providedIn: 'root'
})
export class StatistiqueService {

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

    getStatistique()  : Observable<Statistique>  {
      return this.http.get<Statistique>(`${API_URL}`, this.h);
   }
}
