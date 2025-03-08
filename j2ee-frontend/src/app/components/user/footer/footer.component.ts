import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive, // Import RouterLinkActive
  RouterModule, // Import RouterModule
} from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    RouterLinkActive, // Thêm RouterLinkActive vào imports
    RouterModule, // Thêm RouterModule vào imports
  ],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class footerComponent implements OnInit {
  CurrentUser: string | null = null;
  mobilefooterContent: string = '';
  socialLinks: { icon: string; url: string }[] = [
    { icon: 'fa-brands fa-facebook', url: '#' },
    { icon: 'fa-brands fa-x', url: '#' },
    { icon: 'fa-brands fa-youtube', url: '#' },
    { icon: 'fa-brands fa-tiktok', url: '#' },
    { icon: 'fa-brands fa-instagram', url: '#' },
  ];

  footerContent: {
    label: string;
    routerLink?: string;
    action?: (event?: MouseEvent) => void;
    isUser?: boolean;
  }[] = [];
  dataLoaded: boolean = false;

  searchQuery: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.loadCurrentUser();
  }

  loadCurrentUser(): void {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('currentUser');
      if (user) {
        this.CurrentUser = JSON.parse(user).name;
      } else {
        this.CurrentUser = null;
      }
    }

    this.updatefooterContent();
    this.dataLoaded = true;
  }

  logout(event?: MouseEvent) {
    if (event) {
      event.preventDefault();
    }
    localStorage.removeItem('currentUser');
    localStorage.removeItem('idUser');
    localStorage.removeItem('idBooking');
    localStorage.removeItem('authToken');
    localStorage.removeItem('token');
    this.CurrentUser = null;
    this.updatefooterContent();

    // Navigate to login page
    this.router.navigate(['/auth/login']);
  }
  updatefooterContent(): void {
    if (this.CurrentUser) {
      this.footerContent = [
        {
          label: 'Logout',
          action: (event?: MouseEvent) => this.logout(event),
          isUser: false,
        },
        { label: `${this.CurrentUser}`, isUser: true },
        { label: 'View History', routerLink: '/order-history', isUser: false },
      ];
    } else {
      this.footerContent = [
        { label: 'Sign Up', routerLink: '/auth/login', isUser: false },
        { label: 'My Account', isUser: true },
      ];
    }
  }

  onSearch() {
    if (this.searchQuery) {
      this.router.navigate(['/search'], {
        queryParams: { query: this.searchQuery },
      });
    }
  }

  navigateToHome(): void {
    this.router.navigate(['/home']); // Xóa .then(() => { window.location.reload(); });
  }
}
