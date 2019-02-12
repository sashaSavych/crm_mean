import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Category } from '../models/entities.interface';
import { ResponseMessage } from '../models/helper.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Category[]> {
    return this.httpClient.get<Category[]>('/api/category');
  }

  getOneById(id: string): Observable<Category> {
    return this.httpClient.get<Category>(`/api/category/${id}`);
  }

  create(name: string, file?: File): Observable<Category> {
    const categoryFD = new FormData();
    if (file) {
      categoryFD.append('image', file, file.name)
    }
    categoryFD.append('name', name);
    return this.httpClient.post<Category>('/api/category', categoryFD);
  }

  update(id: string, name: string, file?: File): Observable<Category> {
    const categoryFD = new FormData();
    if (file) {
      categoryFD.append('image', file, file.name)
    }
    categoryFD.append('name', name);
    return this.httpClient.patch<Category>(`/api/category/${id}`, categoryFD);
  }

  delete(id: string): Observable<ResponseMessage> {
    return this.httpClient.delete<ResponseMessage>(`/api/category/${id}`);
  }
}
