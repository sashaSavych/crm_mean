import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/entities.interface';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  constructor(private httpClient: HttpClient) {

  }

  create(order: Order): Observable<Order> {
    return this.httpClient.post('/api/order', order)
  }

}
