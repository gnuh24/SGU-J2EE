import { Component, OnInit } from '@angular/core';
import { GetHotelResponse } from '../../../models/response/product/hotel/hotel/get-hotel-response';
import { GetTourismResponse } from '../../../models/response/product/ticket/tourism/get-tourism-response';
import { GetTourResponse } from '../../../models/response/product/tour/tour/get-tour-response';
import { Observable, combineLatest, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from '../../../services/product/hotel/hotel/hotel.service';
import { TourService } from '../../../services/product/tour/tour/tour.service';
import { TourismService } from '../../../services/product/ticket/tourism/tourism.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']  // Corrected 'styleUrl' to 'styleUrls'
})
export class SearchComponent implements OnInit {
  hotels$: Observable<GetHotelResponse[]>;
  tourism$: Observable<GetTourismResponse[]>;
  tours$: Observable<GetTourResponse[]>;
  location: string;

  currentHotelPage = 1;
  currentTourPage = 1;
  currentTourismPage = 1;
  itemsPerPage = 4; 
  totalHotels = 0;
  totalTours = 0;
  totalTourism = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hotelService: HotelService,
    private tourService: TourService,
    private tourismService: TourismService
  ) {}

  ngOnInit() {
    this.route.queryParams.pipe(
      switchMap(params => {
        this.location = params['query'];
        const query = params['query'];
        this.hotels$ = this.hotelService.getHotelByLocation(query);
        this.tourism$ = this.tourismService.getTourismByCategory(query);
        this.tours$ = this.tourService.getTourByCategory(query);
        return combineLatest([this.hotels$, this.tourism$, this.tours$]);
      })
    ).subscribe(([hotels, tourism, tours]) => {
      this.totalHotels = hotels.length;
      this.totalTourism = tourism.length;
      this.totalTours = tours.length;
    });
  }

  goToLocationDetail(id: string, type: 'hotel' | 'tour' | 'tourism') {
    const paths = {
      hotel: `/hotel-details/${id}`,
      tour: `/location-details/${id}`,
      tourism: `/ticket-details/${id}`
    };
    this.router.navigate([paths[type]]);
  }

  getStars(rating: number) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5 ? 1 : 0;
    return { full, half };
  }

  changePage(type: 'hotel' | 'tour' | 'tourism', page: number) {
    if (type === 'hotel') {
      this.currentHotelPage = page;
    } else if (type === 'tour') {
      this.currentTourPage = page;
    } else if (type === 'tourism') {
      this.currentTourismPage = page;
    }
  }

  getTotalPages(total: number) {
    return Math.ceil(total / this.itemsPerPage);
  }
}
