import { Component } from '@angular/core';
import { GetHotelResponse } from '../../../models/response/product/hotel/hotel/get-hotel-response';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HotelService } from '../../../services/product/hotel/hotel/hotel.service';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from '../../../services/auth.interceptor';
import { UserService } from '../../../services/user/user.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-hotel-list',
  standalone: true,
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    UserService
  ],
  imports: [CommonModule,RouterLink,HttpClientModule],
  templateUrl: './hotel-list.component.html',
  styleUrl: './hotel-list.component.css'
})
export class HotelListComponent {
  location: string | null = null;
  locations: GetHotelResponse [] = [];

  constructor(private route: ActivatedRoute, private router:Router,private hotelService : HotelService,private title:Title) {
    this.title.setTitle("Danh sách khách sạn");
   }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.location = decodeURIComponent(params.get('location') || '');
      if (this.location) {
        this.getHotelByLocation(this.location);
      }
    });
  }

  getHotelByLocation(location: string) {
    this.hotelService.getHotelByLocation(location).subscribe(response => {
      
      if (response) {
        this.locations = response;
      } else {
      }
    }, error => {
      console.log("Error:", error);
    });
  }

  goToLocationDetail(locationId?: number) {
    const path = `/hotel-details/${locationId}`;
    this.router.navigate([path]);
  }

  getStars(rating: number): { full: number, half: boolean } {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0; 
    return { full: fullStars, half: halfStar };
}
}
