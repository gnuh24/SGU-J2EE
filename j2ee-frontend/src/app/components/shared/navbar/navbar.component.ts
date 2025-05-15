import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { UserSessionService } from '../../../services/user-session.service';
import { AuthService } from '../../../services/auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isLoggedIn$ = this.userSession.isLoggedIn$();
  user$ = this.userSession.user$;
  isMobileMenuOpen = false;
  currentRoute = '';

  constructor(
    private userSession: UserSessionService,
    private authService: AuthService,
    private router: Router
  ) {
    // Theo dõi route hiện tại
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentRoute = event.url;
    });
  }

  isActive(route: string): boolean {
    return this.currentRoute === route;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Logout failed:', error);
        // Nếu logout API thất bại, vẫn xóa session và chuyển hướng
        this.userSession.clearSession();
        this.router.navigate(['/login']);
      }
    });
  }
} 