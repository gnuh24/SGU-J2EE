import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {
  private readonly TOKEN_KEY = 'token';
  private readonly REFRESH_TOKEN_KEY = 'refreshToken';
  private readonly USER_ID_KEY = 'userId';
  private readonly USER_EMAIL_KEY = 'userEmail';
  private readonly USER_ROLE_KEY = 'userRole';
  private readonly USER_FULLNAME_KEY = 'userFullName';

  constructor() {}

  // Token methods
  setToken(token: string): void {
    sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  // Refresh token methods
  setRefreshToken(token: string): void {
    sessionStorage.setItem(this.REFRESH_TOKEN_KEY, token);
  }

  getRefreshToken(): string | null {
    return sessionStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  // User ID methods
  setUserId(id: string): void {
    sessionStorage.setItem(this.USER_ID_KEY, id);
  }

  getUserId(): string | null {
    return sessionStorage.getItem(this.USER_ID_KEY);
  }

  // User email methods
  setUserEmail(email: string): void {
    sessionStorage.setItem(this.USER_EMAIL_KEY, email);
  }

  getUserEmail(): string | null {
    return sessionStorage.getItem(this.USER_EMAIL_KEY);
  }

  // User role methods
  setUserRole(role: string): void {
    sessionStorage.setItem(this.USER_ROLE_KEY, role);
  }

  getUserRole(): string | null {
    return sessionStorage.getItem(this.USER_ROLE_KEY);
  }

  // User fullname methods
  setUserFullName(fullName: string): void {
    sessionStorage.setItem(this.USER_FULLNAME_KEY, fullName);
  }

  getUserFullName(): string | null {
    return sessionStorage.getItem(this.USER_FULLNAME_KEY);
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Check if user is admin
  isAdmin(): boolean {
    return this.getUserRole() === 'ADMIN';
  }

  // Clear all session data
  clearSession(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem(this.REFRESH_TOKEN_KEY);
    sessionStorage.removeItem(this.USER_ID_KEY);
    sessionStorage.removeItem(this.USER_EMAIL_KEY);
    sessionStorage.removeItem(this.USER_ROLE_KEY);
    sessionStorage.removeItem(this.USER_FULLNAME_KEY);
  }

  // Set all user data at once
  setUserData(data: {
    token: string;
    refreshToken: string;
    id: string;
    email: string;
    role: string;
    fullName: string;
  }): void {
    this.setToken(data.token);
    this.setRefreshToken(data.refreshToken);
    this.setUserId(data.id);
    this.setUserEmail(data.email);
    this.setUserRole(data.role);
    this.setUserFullName(data.fullName);
  }
} 