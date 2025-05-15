import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserSessionService } from '../services/user-session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private userSession: UserSessionService
  ) {}

  canActivate(): boolean {
    if (this.userSession.isLoggedIn()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
} 