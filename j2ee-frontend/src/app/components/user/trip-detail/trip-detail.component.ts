import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-trip-detail',
  standalone: true,
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.scss'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class TripDetailComponent implements OnInit {
  tripId: string = '';
  tripDetail: any = null;
  loading = false;
  error: string | null = null;
  selectedSeats: number[] = [];
  totalPrice: number = 0;
  bookedSeats: number[] = [];
  activeTab: 'seat' | 'schedule' | 'transfer' | 'policy' = 'seat';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
    this.tripId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.loadTripDetail();
  }

  loadTripDetail(): void {
    this.loading = true;
    this.error = null;
    this.http.get<any>(`http://localhost:8080/api/schedules/${this.tripId}`).subscribe({
      next: (res) => {
        console.log('API response:', res);
        this.tripDetail = res.data;
        this.loading = false;
        this.loadSeatInformation();
      },
      error: (err) => {
        this.error = 'Không thể tải chi tiết chuyến xe.';
        this.loading = false;
      }
    });
  }

  loadSeatInformation(): void {
    this.http.get<any>(`http://localhost:8080/api/seats/schedule/${this.tripId}`).subscribe({
      next: (res) => {
        console.log('Seat information:', res);
        if (res.data) {
          this.bookedSeats = res.data
            .filter((seat: any) => seat.status === 'BOOKED')
            .map((seat: any) => seat.number);
        }
      },
      error: (err) => {
        console.error('Error loading seat information:', err);
      }
    });
  }

  isSeatSelected(seat: number): boolean {
    return this.selectedSeats.includes(seat);
  }

  isSeatBooked(seat: number): boolean {
    return this.bookedSeats.includes(seat);
  }

  toggleSeat(seatNumber: number): void {
    if (this.isSeatBooked(seatNumber)) return;
    const index = this.selectedSeats.indexOf(seatNumber);
    if (index === -1) {
      this.selectedSeats.push(seatNumber);
    } else {
      this.selectedSeats.splice(index, 1);
    }
    this.calculateTotal();
  }

  calculateTotal(): void {
    this.totalPrice = this.selectedSeats.length * (this.tripDetail?.price || 0);
  }

  proceedToPayment(): void {
    if (this.selectedSeats.length > 0) {
      this.router.navigate(['/payment'], {
        queryParams: {
          tripId: this.tripId,
          seats: this.selectedSeats.join(','),
          total: this.totalPrice
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/search']);
  }
} 