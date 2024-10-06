import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserInformationService {

  constructor(
    private readonly http: HttpClient,
  ) { }

  getUserInformation(): Observable<{
    id: number;
    name: string;
    email: string;
    is_admin: boolean;
  }> {
    const endpoint = `${environment.API_URL}/auth/me`;

    return this.http.post<any>(endpoint, {});
  }
}
