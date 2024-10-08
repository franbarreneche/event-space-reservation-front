import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Space } from './space';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SpaceService {
  constructor(private readonly http: HttpClient) {}

  searchSpaces(
    type: string,
    capacity: number,
    dateFrom: Date,
    dateTo: Date,
  ): Observable<Space[]> {
    const endpoint = `${environment.API_URL}/space`;

    return this.http
      .get<{ data: Space[] }>(endpoint)
      .pipe(map((response) => response.data));
  }
}
