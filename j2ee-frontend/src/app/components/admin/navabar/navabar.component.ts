import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, NgModule, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { GetCurrentUserResponse } from '../../../models/response/user/get-current-user-response';

@Component({
  selector: 'app-navabar',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule,RouterLinkActive],
  templateUrl: './navabar.component.html',
  styleUrl: './navabar.component.css'
})
export class NavabarComponent {
  isSidebarOpen = false;
  CurrentUser: GetCurrentUserResponse = new GetCurrentUserResponse();

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  constructor( @Inject(PLATFORM_ID) private platformId: Object, private router: Router){}

  localstore(){
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('currentUser');
      if (user) {
        this.CurrentUser = JSON.parse(user).name;
      } else { 
        this.CurrentUser = null; 
      }
    }
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

    this.router.navigate(['/auth/login']);
  }

}
