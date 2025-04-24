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

// 🔽 Angular Material Modules cần cho table, sort, phân trang, tìm kiếm, input, button
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-root',
    standalone: true,
    // ✅ Chèn tất cả module cần thiết vào đây
    imports: [
        RouterOutlet,
        CommonModule,
        FormsModule,              // Cho [(ngModel)]
        NavbarComponent,
        footerComponent,
        NavabarComponent,

        // Angular Material hỗ trợ bảng
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent {
    title = 'Angular';
    shouldShowNavbar = false;

    constructor(private router: Router) {
        this.router.events
            .pipe(filter((event) => event instanceof NavigationStart))
            .subscribe(() => {
                this.shouldShowNavbar = false;
            });

        this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe((event: NavigationEnd) => {
                this.shouldShowNavbar = !(
                    event.url.startsWith('/auth') || event.url.startsWith('/admin')
                );
            });
    }
}
