import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, NgModule, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
// import { GetCurrentUserResponse } from '../../../models/user/get-current-user-response';

@Component({
    selector: 'app-navabar',
    standalone: true,
    imports: [RouterOutlet, RouterLink, CommonModule, RouterLinkActive],
    templateUrl: './navabar.component.html',
    styleUrl: './navabar.component.css'
})
export class NavabarComponent {

    constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router) { }

    // localstore(){
    //   if (isPlatformBrowser(this.platformId)) {
    //     const user = localStorage.getItem('currentUser');
    //     if (user) {
    //       this.CurrentUser = JSON.parse(user).name;
    //     } else { 
    //       this.CurrentUser = null; 
    //     }
    //   }
    // }

    logout(event?: MouseEvent) {
        if (event) {
            event.preventDefault();
        }
        sessionStorage.removeItem('currentUser');
        sessionStorage.removeItem('idUser');
        sessionStorage.removeItem('idBooking');
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('token');

        this.router.navigate(['/login']);
    }

}
