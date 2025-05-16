import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Thêm
import { RouterModule } from '@angular/router';
import { InvoiceService } from '../../../services/invoice.service';

@Component({
    selector: 'app-order-history',
    standalone: true,
    imports: [CommonModule, RouterModule], // ✅ Thêm CommonModule
    templateUrl: './order-history.component.html',
    styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
    orders: any[] = [];
    loading = false;  // Chỉ khai báo 1 lần
    error: string | null = null;

    constructor(private invoiceService: InvoiceService) { }

    ngOnInit(): void {
        this.fetchOrderHistory();
    }

    fetchOrderHistory() {
        this.loading = true;
        this.error = null;

        const user = sessionStorage.getItem('user_data');
        const userId = user ? JSON.parse(user).id : null;

        if (!userId) {
            this.error = 'Không tìm thấy thông tin người dùng.';
            this.loading = false;
            return;
        }

        this.invoiceService.getInvoiceByUserId(userId).subscribe({
            next: (response: any) => {
                this.orders = response?.data || [];
                this.loading = false;
            },
            error: () => {
                this.error = 'Không thể tải dữ liệu hóa đơn.';
                this.loading = false;
            }
        });
    }

    exportPdf(id: string): void {
        this.loading = true;
        this.invoiceService.exportInvoicePdf(id).subscribe({
            next: (blob: Blob) => {
                this.loading = false;
                // Tạo link tải file PDF
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `Invoice_${id}.pdf`;
                a.click();
                window.URL.revokeObjectURL(url);
            },
            error: (err: any) => {
                this.loading = false;
                console.error('Failed to export PDF', err);
            }
        });
    }
}
