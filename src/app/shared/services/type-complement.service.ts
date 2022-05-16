import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {TypeComplement} from "../models/TypeComplement";
import {Observable} from "rxjs";
const API_URL = `${environment.api}/complements_types`

@Injectable({
  providedIn: 'root'
})
export class TypeComplementService {

  constructor(private http : HttpClient) { }

  getAll() : Observable<TypeComplement[]>{
    return this.http.get<TypeComplement[]>(API_URL);
  }

  getById(id: number) : Observable<TypeComplement>{
    return this.http.get<TypeComplement>(API_URL + `/${id}`);
  }

  create(typeComplement: TypeComplement) : Observable<TypeComplement>{
    return this.http.post<TypeComplement>(API_URL, typeComplement);
  }

  update(typeComplement: TypeComplement) : Observable<TypeComplement>{
    return this.http.put<TypeComplement>(API_URL + `/${typeComplement.id}`, typeComplement);
  }

  delete(id: number) : Observable<any>{
    return this.http.delete(API_URL + `/${id}`);
  }

  testeCreateWithFile(fb: FormData) : Observable<TypeComplement>{
    return this.http.post<TypeComplement>(`${API_URL}/create-teste`, fb);
  }

}
