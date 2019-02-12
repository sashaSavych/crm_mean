import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Position } from '../models/entities.interface'
import { ResponseMessage } from '../models/helper.interface';

@Injectable({
  providedIn: 'root'
})
export class PositionsService {
  constructor(private httpClient: HttpClient) {}

  getAllByCategoryId(categoryId: string): Observable<Position[]> {
    return this.httpClient.get<Position[]>(`/api/position/${categoryId}`)
  }

  create(position: Position): Observable<Position> {
    return this.httpClient.post<Position>('/api/position', position);
  }

  update(position: Position): Observable<Position> {
    return this.httpClient.patch<Position>(`/api/position/${position._id}`, position);
  }

  delete(positionId: string): Observable<ResponseMessage> {
    return this.httpClient.delete<ResponseMessage>(`/api/position/${positionId}`);
  }
}
