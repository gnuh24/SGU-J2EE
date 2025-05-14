import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CityService } from '../../../services/city.service';
import { City } from '../../../models/city.model';

@Component({
  selector: 'app-trip-search',
  standalone: true,
  templateUrl: './trip-search.component.html',
  styleUrls: ['./trip-search.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class TripSearchComponent implements OnInit {
  searchForm: FormGroup;
  trips: any[] = []; // Sẽ được thay thế bằng interface Trip sau
  cities: City[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cityService: CityService
  ) {
    this.searchForm = this.fb.group({
      fromCity: [''],
      toCity: [''],
      departureDate: [''],
      returnDate: ['']
    });
  }

  ngOnInit(): void {
    this.cityService.getCities().subscribe(cities => {
      this.cities = cities.filter(city => city.status === 'ACTIVE');
    });
    this.trips = [
      {
        id: 1,
        fromCity: 'An Hữu (Tiền Giang)',
        toCity: 'TP.Hồ Chí Minh',
        busType: 'Limousine',
        distance: '123km',
        duration: '2 giờ',
        price: 110000,
        availableSeats: 22,
        companyName: 'FUTA',
        departureTime: '10:00',
        arrivalTime: '12:00'
      },
      {
        id: 2,
        fromCity: 'An Khê (Gia Lai)',
        toCity: 'TP.Hồ Chí Minh',
        busType: 'Limousine',
        distance: '640km',
        duration: '13 giờ',
        price: 250000,
        availableSeats: 14,
        companyName: 'FUTA',
        departureTime: '12:00',
        arrivalTime: '01:00'
      }
    ];
  }

  loadTrips(): void {
    // TODO: Gọi API để lấy danh sách chuyến xe
  }

  searchTrips(): void {
    // TODO: Gọi API tìm kiếm với các điều kiện từ form
  }

  viewTripDetail(tripId: string): void {
    this.router.navigate(['/trip-detail', tripId]);
  }
} 