import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { GetTourismResponse } from '../../../models/response/product/ticket/tourism/get-tourism-response';
import { TourismService } from '../../../services/product/ticket/tourism/tourism.service';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from '../../../services/auth.interceptor';
import { UserService } from '../../../services/user/user.service';
import { BookingService } from '../../../services/booking/booking.service';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    UserService
  ],
  imports: [CommonModule,RouterLink,HttpClientModule],
  templateUrl: './ticket-list.component.html',
  styleUrl: './ticket-list.component.css'
})
export class TicketListComponent {
  location: string | null = null;
  locations: GetTourismResponse [] = [];

  constructor(private route: ActivatedRoute, private router:Router,
    private tourismService : TourismService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.location = decodeURIComponent(params.get('location') || '');
      if (this.location) {
        this.getTourismByCategory(this.location);
      }
    });
  }

  getTourismByCategory(location: string) {
    this.tourismService.getTourismByCategory(location).subscribe(response => {
      if (response) {
        this.locations = response;
      } else {
        console.log("Thất bại");
      }
    }, error => {
      console.log("Error:", error);
    });
  }

  goToLocationDetail(locationId?: number) {
    const path = `/ticket-details/${locationId}`;
    this.router.navigate([path]);
    console.log('Navigating to:', path);
  }

  getStars(rating: number): { full: number, half: boolean } {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0; 
    return { full: fullStars, half: halfStar };
}


}
