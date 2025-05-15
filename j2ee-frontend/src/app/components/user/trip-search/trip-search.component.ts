import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
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
  cities: City[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private cityService: CityService
  ) {
    this.searchForm = this.fb.group({
      fromCity: ['', Validators.required],
      toCity: ['', Validators.required],
      departureDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCities();
  }

  loadCities(): void {
    this.loading = true;
    this.cityService.getCitiesNoPaging().subscribe({
      next: (response: ApiResponse<City[]>) => {
        if (response.data) {
          this.cities = response.data.filter(city => city.status === 'ACTIVE');
        }
        this.loading = false;
      },
      error: (error) => {
        this.error = error.error.message || 'Không thể tải danh sách thành phố';
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.searchForm.valid) {
      // Xử lý tìm kiếm chuyến đi
      console.log('Search form submitted:', this.searchForm.value);
    }
  }
} 