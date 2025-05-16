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
  seats: any[] = [];

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
    const scheduleId = this.tripDetail?.id;
    if (scheduleId) {
      this.http.get<any>(`http://localhost:8080/api/seats/schedule/${scheduleId}`).subscribe({
        next: (res) => {
          if (res.data) {
            // Lấy đúng 17 ghế đầu tiên nếu API trả nhiều hơn
            this.seats = res.data.slice(0, 17);
          }
        },
        error: (err) => {
          console.error('Lỗi khi lấy danh sách ghế:', err);
        }
      });
    }
  }

  isSeatBooked(seatNumber: number): boolean {
    const seat = this.seats.find(s => s.number === seatNumber);
    return seat?.status === 'BOOKED';
  }

  isSeatSelected(seatNumber: number): boolean {
    return this.selectedSeats?.includes(seatNumber);
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
    const price = this.tripDetail?.route?.price || 0;
    this.totalPrice = this.selectedSeats.length * price;
  }

  bookSeats(): void {
    // Kiểm tra đăng nhập
    const userData = sessionStorage.getItem('user_data');
    if (!userData) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
      return;
    }
    const user = JSON.parse(userData);
    const profileId = user.id || user.profileId; // tuỳ theo cấu trúc user_data

    // Chuẩn bị tickets
    const tickets = this.selectedSeats.map(seatNumber => {
      const seat = this.seats.find(s => s.number === seatNumber);
      return {
        scheduleId: this.tripDetail.id,
        seatId: seat.id,
        price: this.tripDetail.route.price,
        status: 'BOOKED'
      };
    });

    const payload = {
      profileId,
      totalAmount: this.totalPrice,
      paymentMethod: 'VNPAY',
      tickets
    };
    this.http.post('http://localhost:8080/api/invoices', payload).subscribe({
      next: (res: any) => {
        // Nếu có url thanh toán, chuyển hướng sang url đó
        if (res?.data?.url) {
          window.location.href = res.data.url;
        } else {
          alert('Đặt vé thành công!');
        }
        // this.router.navigate(['/success']); // hoặc trang xác nhận
      },
      error: (err) => {
        alert('Đặt vé thất bại!');
        console.error(err);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/search']);
  }
} 