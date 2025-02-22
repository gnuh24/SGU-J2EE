import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { TourService } from '../../../services/product/tour/tour/tour.service';
import { GetTourResponse } from '../../../models/response/product/tour/tour/get-tour-response';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from '../../../services/auth.interceptor';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-location-list',
  imports:[CommonModule,RouterLink,HttpClientModule],
  standalone: true,
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    UserService
  ],
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']

})
export class LocationListComponent implements OnInit {
  location: string | null = null;
  locations: GetTourResponse [] = [];

  constructor(private route: ActivatedRoute, private router:Router,private tourService : TourService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.location = decodeURIComponent(params.get('location') || '');
      if (this.location) {
        this.getLocationsForSelectedLocation(this.location);
      }
    });
  }

  getLocationsForSelectedLocation(location: string) {
    this.tourService.getTourByCategory(location).subscribe({
      next: (response) => {
        if (response) {
          this.locations = response;
        } else {
        }
      },
      error(err) {
        console.log('Error fetching locations:',err);
      },
    });
  }

  goToLocationDetail(locationId?: number) {
    const path = `/location-details/${locationId}`;
    this.router.navigate([path]);
  }
  
}
