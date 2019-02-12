import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Category } from '../models/entities.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Category[]> {
    return this.httpClient.get<Category[]>('/api/category');
  }

  getOneById(id: string): Observable<Category> {
    return this.httpClient.get<Category>(`/api/category${id}`);
  }
}
