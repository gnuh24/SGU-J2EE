import { Component, OnInit, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { InvoiceService } from '../../../services/invoice.service';
import { TicketService } from '../../../services/ticket.service';
@Component({
    selector: 'app-order-history',
    standalone: true,
    imports: [CommonModule, MatDialogModule],
    templateUrl: './order-history.component.html',
    styleUrls: ['./order-history.component.scss'],
})
export class OrderHistoryComponent implements OnInit {
    orders: any[] = [];
    loading = false;
    error: string | null = null;

    // Mảng chứa chi tiết từng hoá đơn, key theo invoice id
    invoiceDetailsMap: { [invoiceId: string]: any } = {};

    constructor(private invoiceService: InvoiceService, private ticketService: TicketService) { }

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

                // Tự động load chi tiết từng hoá đơn để hiển thị luôn
                this.orders.forEach(order => this.loadInvoiceDetails(order.id));
            },
            error: () => {
                this.error = 'Không thể tải dữ liệu hóa đơn.';
                this.loading = false;
            },
        });
    }

    loadInvoiceDetails(invoiceId: string) {
        // Nếu đã có rồi thì không gọi lại API
        if (this.invoiceDetailsMap[invoiceId]) return;

        this.invoiceService.getInvoiceById(invoiceId).subscribe({
            next: (res: any) => {
                this.invoiceDetailsMap[invoiceId] = res.data;
            },
            error: () => {
                this.invoiceDetailsMap[invoiceId] = null; // Hoặc xử lý lỗi
                console.error(`Không tải được chi tiết hoá đơn ${invoiceId}`);
            },
        });
    }

    exportPdf(id: string): void {
        this.loading = true;
        this.invoiceService.exportInvoicePdf(id).subscribe({
            next: (blob: Blob) => {
                this.loading = false;
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
            },
        });
    }

    exportTicketPdf(ticketId: string): void {
        this.ticketService.exportTicketQrCode(ticketId).subscribe({
            next: (blob: Blob) => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `Ticket_${ticketId}_QRCode.png`;
                a.click();
                window.URL.revokeObjectURL(url);
            },
            error: (err: any) => {
                console.error('Failed to export ticket QR code', err);
            }
        });
    }
}
