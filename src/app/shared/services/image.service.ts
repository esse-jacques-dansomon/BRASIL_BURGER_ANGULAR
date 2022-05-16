import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Product} from "../models/product";
import {Observable} from "rxjs";
import {Burger} from "../models/burger";
const API_URL=`${environment.api}/images`;

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http : HttpClient) { }
   header = new HttpHeaders(
      {
         'Content-Type': 'application/json',
      }
   );
   h = {headers: this.header};
  updateProductImage(id: number, image: FormData) {
    return this.http.put(`${API_URL}/${id}`, image);
  }

  updatetypeImage(id: number, image: FormData) {
    return this.http.put(`${API_URL}/type/${id}`, image);
  }

   updateStatusProduct(burger: Product) : Observable<any> {
      return this.http.patch<Product>(`${environment.api}/products/edit`, burger, this.h);
   }

}
