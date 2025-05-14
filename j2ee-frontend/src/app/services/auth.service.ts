import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResponseDTO } from '../models/auth.model';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<AuthResponseDTO> {
    return this.http.post<AuthResponseDTO>(`${this.apiUrl}/auth/login`, { email, password }, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      tap((response: AuthResponseDTO) => {
          if (response && response.data.token) {
          sessionStorage.setItem('token', response.data.token);
          sessionStorage.setItem('userEmail', response.data.email);
          sessionStorage.setItem('idUser', response.data.id);
        }
      })
    );
  }

  register(email: string, password: string, fullname: string, phone: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/register`, { email, password, fullname, phone }, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  logout(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('idUser');
    this.router.navigate(['/login']);
  }
} 