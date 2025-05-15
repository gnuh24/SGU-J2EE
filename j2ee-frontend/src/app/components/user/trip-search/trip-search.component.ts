import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CityService } from '../../../services/city.service';
import { ApiResponse } from '../../../models/apiresponse';

interface City {
  id: string;
  name: string;
  status: string;
}

@Component({
  selector: 'app-trip-search',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, HttpClientModule],
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
      fromCity: ['', Validators.required],
      toCity: ['', Validators.required],
      departureDate: [this.getToday(), Validators.required],
      returnDate: ['']
    });
  }

  ngOnInit(): void {
    this.loadCities();
    // Không gọi searchTrips() ở đây nữa, gọi khi submit form
  }

  getToday(): string {
    const today = new Date();
    return today.toISOString().substring(0, 10);
  }

  loadCities() {
    this.http.get<any>('http://localhost:8080/api/cities/no-paging').subscribe({
      next: (res) => {
        this.cities = (res.data || []).filter((city: City) => city.status === 'ACTIVE');
        if (this.cities.length > 0) {
          // Thiết lập giá trị mặc định nếu có cities
          this.searchForm.patchValue({
            fromCity: this.cities[0].id,
            toCity: this.cities.length > 1 ? this.cities[1].id : this.cities[0].id // Tránh lỗi nếu chỉ có 1 city
          });
        }
      },
      error: () => {
        this.cities = [];
      }
    });
  }

  onSubmit(): void {
    if (this.searchForm.valid) {
      this.searchTrips();
      console.log('Search form submitted:', this.searchForm.value);
    }
  }

  searchTrips() {
    console.log('searchTrips called', this.searchForm.value, this.searchForm.valid);
    this.loading = true;
    this.error = null;
    this.trips = [];

    const { fromCity, toCity, departureDate } = this.searchForm.value;
    const params = [
      'page=0',
      'size=10',
      'sort=',
      'search=',
      'status=ACTIVE',
      `startCityId=${fromCity}`,
      `endCityId=${toCity}`,
      `departureTime=${departureDate}`
    ].join('&');
    const url = `http://localhost:8080/api/schedules/public?${params}`;

    this.http.get<any>(url).subscribe({
      next: (res) => {
        this.trips = res.data || [];
        console.log('Trips loaded:', this.trips);
        if (this.trips.length === 0) {
          this.error = 'Không tìm thấy chuyến đi phù hợp.';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Lỗi khi tìm kiếm chuyến đi.';
        console.error('API schedule error:', err);
        this.loading = false;
      }
    });
  }

  viewTripDetail(tripId: number) {
    alert('Xem chi tiết chuyến đi: ' + tripId);
  }
}