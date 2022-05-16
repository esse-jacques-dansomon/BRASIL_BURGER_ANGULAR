import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Menu} from "../models/menu";

const API_URL=`${environment.api}/menus`;

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http : HttpClient) {

  }

  getMenus() : Observable<Menu[]>{
    return this.http.get<Menu[]>(API_URL);
  }

  getMenu(id: number) : Observable<Menu>{
    return this.http.get<Menu>(API_URL+`/${id}`);
  }

  createMenu(menu: Menu) : Observable<Menu>{
    return this.http.post<Menu>(API_URL, menu);
  }

  updateMenu(menu: Menu) : Observable<Menu>{
    return this.http.put<Menu>(API_URL+`/${menu.id}`, menu);
  }

  deleteMenu(id: number) : Observable<Menu>{
    return this.http.delete<Menu>(API_URL+`/${id}`);
  }



}
