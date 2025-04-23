import { Component } from '@angular/core';
import {
  NavigationEnd,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { NavbarComponent } from './components/user/navbar/navbar.component';
import { NavabarComponent } from './components/admin/navabar/navabar.component';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { footerComponent } from './components/user/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    footerComponent,
    NavabarComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Angular';

  shouldShowNavbar = false; // Mặc định ẩn navbar

  constructor(private router: Router) {
    // Lắng nghe sự kiện khi điều hướng bắt đầu
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe(() => {
        this.shouldShowNavbar = false; // Ẩn navbar khi bắt đầu điều hướng
      });

    // Lắng nghe sự kiện khi điều hướng kết thúc
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Kiểm tra URL sau khi điều hướng hoàn tất
        this.shouldShowNavbar = !(
          event.url.startsWith('/auth') || event.url.startsWith('/admin')
        );
      });
  }
}
