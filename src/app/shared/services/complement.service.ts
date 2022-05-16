import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Complement} from "../models/complement";
const API_URL = `${environment.api}/complements`;
@Injectable({
  providedIn: 'root'
})
export class ComplementService {

  constructor(private http : HttpClient) { }

   getComplements(): Observable<Complement[]> {
    return this.http.get<Complement[]>(API_URL);
   };

   getComplement(id: number): Observable<Complement> {
    return this.http.get<Complement>(API_URL + `/${id}`);
   }

   createComplement(complement: Complement): Observable<Complement> {
    return this.http.post<Complement>(API_URL, complement);
   }

   updateComplement(complement: Complement): Observable<Complement> {
    return this.http.put<Complement>(API_URL + `/${complement.id}`, complement);
   }

   deleteComplement(id: number): Observable<Complement> {
    return this.http.delete<Complement>(API_URL + `/${id}`);
   }


}
