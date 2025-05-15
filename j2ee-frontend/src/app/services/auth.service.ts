import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/apiresponse';
import { UserData } from '../models/user.model';

interface RegisterData {
  email: string;
  password: string;
  fullName: string;
  phone: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private readonly USER_KEY = 'user_data';

  constructor(private http: HttpClient) {}

  register(userData: RegisterData): Observable<ApiResponse<UserData>> {
    return this.http.post<ApiResponse<UserData>>(`${this.apiUrl}/register`, userData)
      .pipe(
        tap(response => {
          if (response.data) {
            sessionStorage.setItem(this.USER_KEY, JSON.stringify(response.data));
          }
        })
      );
  }

  login(email: string, password: string): Observable<ApiResponse<UserData>> {
    return this.http.post<ApiResponse<UserData>>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(response => {
          console.log('Login API response:', response);
          if (response.data) {
            sessionStorage.setItem(this.USER_KEY, JSON.stringify(response.data));
          }
        })
      );
  }

  getUser(): UserData | null {
    const data = sessionStorage.getItem(this.USER_KEY);
    return data ? JSON.parse(data) : null;
  }

  logout(): void {
    sessionStorage.removeItem(this.USER_KEY);
  }
} 