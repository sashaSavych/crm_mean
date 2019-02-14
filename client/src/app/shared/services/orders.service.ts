import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/entities.interface';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  constructor(private httpClient: HttpClient) {  }

  getAllOrders(params: any = {}): Observable<Order[]> {
    return this.httpClient.get<Order[]>('/api/order', {
      params: new HttpParams({
        fromObject: params
      })
    });
  }

  create(order: Order): Observable<Order> {
    return this.httpClient.post('/api/order', order)
  }

}
