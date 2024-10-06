import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private access_token: string | null = null;

  constructor() {
    this.loadTokenFromStorage();
  }

  isAuthenticated(): boolean {
    return this.access_token !== null;
  }

  getToken(): string {
    return this.access_token;
  }

  setToken(token: {access_token: string, token_type: string, expires_in: number}): void {
    this.access_token = token.access_token;
    this.saveTokenToLocalStorage(token.access_token);
  }

  removeToken(): void {
    this.access_token = null;
    localStorage.removeItem('token');
  }

  private loadTokenFromStorage(): void {
    this.access_token = localStorage.getItem('token');
  }

  private saveTokenToLocalStorage(access_token: string): void {
    localStorage.setItem('token', access_token);
  }
}
