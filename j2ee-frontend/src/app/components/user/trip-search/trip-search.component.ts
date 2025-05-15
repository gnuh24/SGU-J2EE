import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CityService } from '../../../services/city.service';
import { ApiResponse } from '../../../models/apiresponse';
import { TripListComponent } from '../trip-list/trip-list.component';

interface City {
  id: string;
  name: string;
  status: string;
}

@Component({
  selector: 'app-trip-search',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, HttpClientModule, TripListComponent],
  templateUrl: './trip-search.component.html',
  styleUrls: ['./trip-search.component.scss']
})
export class TripSearchComponent implements OnInit {
  searchForm: FormGroup;
  trips: any[] = [];
  error: string | null = null;
  loading = false;
  cities: City[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.searchForm = this.fb.group({
      fromCity: [''],
      toCity: [''],
      departureDate: ['']
    });
  }

  ngOnInit(): void {
    console.log('Component initialized');
    this.loadCities().then(() => {
      console.log('Cities loaded, calling searchTrips');
      this.searchTrips();
    });
  }

  loadCities() {
    console.log('Loading cities...');
    return new Promise<void>((resolve) => {
      this.http.get<any>('http://localhost:8080/api/cities/no-paging').subscribe({
        next: (res) => {
          console.log('Cities loaded:', res);
          this.cities = (res.data || []).filter((city: City) => city.status === 'ACTIVE');
          resolve();
        },
        error: (err) => {
          console.error('Error loading cities:', err);
          this.cities = [];
          resolve();
        }
      });
    });
  }

  onSubmit(): void {
    if (this.searchForm.valid) {
      this.searchTrips();
      console.log('Search form submitted:', this.searchForm.value);
    }
  }

  searchTrips() {
    console.log('searchTrips called with form value:', this.searchForm.value);
    this.loading = true;
    this.error = null;
    this.trips = [];

    const { departureDate } = this.searchForm.value;
    console.log('Form value:', { departureDate });

    // Chỉ truyền mỗi departureTime
    let url = 'http://localhost:8080/api/schedules/public';
    if (departureDate) {
      const formattedDate = departureDate.length > 10 ? departureDate.substring(0, 10) : departureDate;
      url += `?departureTime=${encodeURIComponent(formattedDate)}`;
    }
    console.log('Making API call to:', url);

    this.http.get<any>(url).subscribe({
      next: (res) => {
        console.log('API response:', res);
        // Ensure we're working with an array
        if (res && res.data) {
          this.trips = Array.isArray(res.data) ? res.data : [res.data];
        } else {
          this.trips = [];
        }
        if (this.trips.length === 0) {
          this.error = 'Không tìm thấy chuyến đi phù hợp.';
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('API error:', err);
        this.error = 'Lỗi khi tìm kiếm chuyến đi.';
        this.trips = [];
        this.loading = false;
      }
    });
  }

  viewTripDetail(tripId: string) {
    console.log('Xem chi tiết chuyến:', tripId);
  }
}