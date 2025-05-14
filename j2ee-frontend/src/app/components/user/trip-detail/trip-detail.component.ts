import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-trip-detail',
  standalone: true,
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.scss'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class TripDetailComponent implements OnInit {
  tripId: string;
  trip: any; // Sẽ được thay thế bằng interface Trip
  selectedSeats: number[] = [];
  totalPrice: number = 0;
  bookedSeats: number[] = [];
  activeTab: 'seat' | 'schedule' | 'transfer' | 'policy' = 'seat';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.tripId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.loadTripDetail();
  }

  loadTripDetail(): void {
    this.trip = {
      id: 1,
      fromCity: 'An Hữu (Tiền Giang)',
      toCity: 'TP.Hồ Chí Minh',
      busType: 'Limousine',
      price: 110000,
      availableSeats: 22,
      companyName: 'FUTA',
      departureTime: '10:00',
      arrivalTime: '12:00'
    };
    this.bookedSeats = [3, 7, 12];
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
    this.totalPrice = this.selectedSeats.length * (this.trip?.price || 0);
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
} 