import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
  orders: any[] = [];
  loading = false;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchOrderHistory();
  }

  fetchOrderHistory() {
    this.loading = true;
    this.error = null;
    // Lấy userId từ sessionStorage
    const user = sessionStorage.getItem('user_data');
    const userId = user ? JSON.parse(user).id : null;
    if (!userId) {
      this.error = 'Không tìm thấy thông tin người dùng.';
      this.loading = false;
      return;
    }
    // Gọi API lấy lịch sử mua vé
    this.http.get<any>(`http://localhost:8080/api/orders/history?userId=${userId}`).subscribe({
      next: (res) => {
        this.orders = res.data || [];
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Lỗi khi tải lịch sử mua vé.';
        this.loading = false;
      }
    });
  }
} 