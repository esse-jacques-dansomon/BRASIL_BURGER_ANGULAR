import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Order} from "../models/order";
const API_URL=`${environment.api}/orders`;

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
     private http: HttpClient,
  ) { }

   getAll(): Observable<Order[]> {
    return this.http.get<Order[]>(API_URL);
  }

  get(id: number): Observable<Order> {
    return this.http.get<Order>(`${API_URL}/${id}`);
  }

  create(order: Order): Observable<Order> {
    return this.http.post<Order>(API_URL, order);
  }

  update(order: Order): Observable<Order> {
    return this.http.patch<Order>(`${API_URL}/edit-status`, order);
  }

  updatePayement(order: Order, type: String): Observable<Order> {
     let payement =
     {
        "status": type,
        "id": order.id
     }
     console.log(order);
    this.http.patch<Order>(`${API_URL}/edit-payment`, payement).subscribe(
      data => {
        console.log(data);
      },
    (error) => {
      console.log(error);
     }
    );
    return this.update(order);
  }

  delete(id: number): Observable<Order> {
    return this.http.delete<Order>(`${API_URL}/${id}`);
  }

  filterByStatus(status: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${API_URL}/filter/status/${status}`);
  }


  filterByProductType(productType: string): Observable<Order[]> {
     console.log(`${API_URL}/filter/product/${productType}`);
    return this.http.get<Order[]>(`${API_URL}/filter/product/${productType}`);
  }

  filterByBetweenDates(startDate: string, endDate: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${API_URL}/filter/date/${startDate}/${endDate}`);
  }

}
