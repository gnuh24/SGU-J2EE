import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive, // Import RouterLinkActive
  RouterModule, // Import RouterModule
} from '@angular/router';
// import { UserService } from '../../../services/user/user.service';
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
export class FooterComponent {

}
