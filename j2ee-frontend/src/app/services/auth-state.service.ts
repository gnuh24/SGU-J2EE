import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthResponseDTO } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  private currentUserSubject = new BehaviorSubject<AuthResponseDTO | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    // Khởi tạo state từ localStorage khi service được tạo
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        this.currentUserSubject.next(parsedUser);
      } catch (e) {
        localStorage.removeItem('currentUser');
      }
    }
  }

  setCurrentUser(user: AuthResponseDTO | null): void {
    if (user) {
      // Lưu vào localStorage với encryption
      const encryptedUser = this.encryptData(user);
      localStorage.setItem('currentUser', encryptedUser);
    } else {
      localStorage.removeItem('currentUser');
    }
    this.currentUserSubject.next(user);
  }

  getCurrentUser(): AuthResponseDTO | null {
    return this.currentUserSubject.value;
  }

  getToken(): string | null {
    const user = this.getCurrentUser();
    return user?.data?.token || null;
  }

  getIdUser(): string | null {
    const user = this.getCurrentUser();
    return user?.data?.id || null;
  }

  clearAuth(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  // Simple encryption (trong thực tế nên sử dụng thư viện encryption mạnh hơn)
  private encryptData(data: any): string {
    // Đây chỉ là ví dụ đơn giản, trong thực tế nên sử dụng thư viện encryption
    return btoa(JSON.stringify(data));
  }

  private decryptData(encryptedData: string): any {
    try {
      return JSON.parse(atob(encryptedData));
    } catch (e) {
      return null;
    }
  }
} 