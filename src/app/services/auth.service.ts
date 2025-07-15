// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

interface AuthResponse {
  token: string;
}

interface LoginRequest {
  username: string;
  password: string;
}

interface RegisterRequest {
  username: string;
  name: string;
  email: string;
  password: string;
  birthday: string; // formato: YYYY-MM-DD
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  async login(data: LoginRequest): Promise<void> {
    const res = await firstValueFrom(
      this.http.post<AuthResponse>(`${this.apiUrl}/login`, data)
    );
    localStorage.setItem('token', res.token);
  }

  async register(data: RegisterRequest): Promise<void> {
    const res = await firstValueFrom(
      this.http.post<AuthResponse>(`${this.apiUrl}/register`, data)
    );
    localStorage.setItem('token', res.token);
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
