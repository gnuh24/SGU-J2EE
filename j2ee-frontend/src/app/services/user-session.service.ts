import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserData } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {
  private readonly USER_KEY = 'user_data';
  private userSubject = new BehaviorSubject<UserData | null>(this.getUserData());
  public user$ = this.userSubject.asObservable();

  constructor() {
    // Kiểm tra và load user data từ sessionStorage khi service được khởi tạo
    const userData = this.getUserData();
    if (userData) {
      this.userSubject.next(userData);
    }
  }

  setUserData(userData: UserData): void {
    sessionStorage.setItem(this.USER_KEY, JSON.stringify(userData));
    this.userSubject.next(userData);
  }

  getUserData(): UserData | null {
    const data = sessionStorage.getItem(this.USER_KEY);
    return data ? JSON.parse(data) : null;
  }

  clearSession(): void {
    sessionStorage.removeItem(this.USER_KEY);
    this.userSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!this.getUserData();
  }

  getToken(): string | null {
    return this.getUserData()?.token || null;
  }

  getRefreshToken(): string | null {
    return this.getUserData()?.refreshToken || null;
  }

  getUserId(): string | null {
    return this.getUserData()?.id || null;
  }

  getUserEmail(): string | null {
    return this.getUserData()?.email || null;
  }

  getUserRole(): string | null {
    return this.getUserData()?.role || null;
  }

  getUserFullName(): string | null {
    return this.getUserData()?.fullName || null;
  }

  setUserFullName(fullName: string): void {
    const userData = this.getUserData();
    if (userData) {
      userData.fullName = fullName;
      this.setUserData(userData);
    }
  }

  // Observable để theo dõi trạng thái đăng nhập
  isLoggedIn$(): Observable<boolean> {
    return new Observable<boolean>(observer => {
      observer.next(this.isLoggedIn());
      const subscription = this.user$.subscribe(() => {
        observer.next(this.isLoggedIn());
      });
      return () => subscription.unsubscribe();
    });
  }
} 