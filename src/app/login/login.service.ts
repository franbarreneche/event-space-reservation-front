import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private readonly http: HttpClient,
  ) { }

  login(form: {email: string, password: string}): Observable<{access_token: string, token_type: string, expires_in: number }> {
    const endpoint = `${environment.API_URL}/auth/login`;

    return this.http.post<any>(endpoint, form);
  }
}
