import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TicketService } from '../../../services/ticket.service';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import jsQR from 'jsqr';
import Swal from 'sweetalert2';
@Component({
    selector: 'app-ticket-checking',
    templateUrl: './ticket-checking.component.html',
    styleUrls: ['../admin-dashboard.scss', './ticket-checking.component.scss']
})
export class TicketCheckingComponent implements OnInit {
    ticketIdControl = new FormControl('');
    ticket: any = null;
    imagePreview: any = null;
    loading: boolean = false;
    error: string | null = null;

    constructor(
        private ticketService: TicketService,
        private sanitizer: DomSanitizer,
        private http: HttpClient
    ) { }

    ngOnInit(): void {
    }

    checkTicket(): void {
        const id = this.ticketIdControl.value;
        if (!id) {
            this.error = 'Vui lòng nhập ID vé để kiểm tra.';
            Swal.fire('Lỗi', this.error, 'error');
            return;
        }
        this.fetchTicket(id);
    }

    onFileSelected(event: any): void {
        this.error = null;
        const file: File = event.target.files[0];

        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();

            reader.onload = (e: any) => {
                const imageDataUrl = e.target.result;
                this.imagePreview = this.sanitizer.bypassSecurityTrustUrl(imageDataUrl);

                const img = new Image();
                img.src = imageDataUrl;

                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    context?.drawImage(img, 0, 0, canvas.width, canvas.height);

                    const imageData = context?.getImageData(0, 0, canvas.width, canvas.height);
                    if (imageData) {
                        const code = jsQR(imageData.data, canvas.width, canvas.height);
                        if (code && code.data) {
                            const ticketId = code.data;
                            if (ticketId) {
                                this.ticketIdControl.setValue(ticketId);
                                this.checkAndUpdateTicketStatus(ticketId);
                            } else {
                                Swal.fire('Thông báo', 'Không thể tìm thấy id từ QR.', 'warning');
                                return;
                            }
                        } else {
                            Swal.fire('Thông báo', 'Không thể đọc được mã QR từ ảnh.', 'warning');
                            return;
                        }
                    }
                };
            };

            reader.readAsDataURL(file);
        } else {
            this.error = 'Vui lòng chọn file ảnh (.jpg, .png, ...).';
        }
    }



    fetchTicket(id: string): void {
        this.loading = true;
        this.ticketService.getTicketById(id).subscribe({
            next: (res) => {
                this.ticket = res.data;
                this.loading = false;
            },
            error: () => {
                this.error = 'Không tìm thấy vé với ID này.';
                this.ticket = null;
                this.loading = false;
            }
        });
    }

    checkAndUpdateTicketStatus(id: string): void {
        this.loading = true;
        this.error = null;
        this.http.get<any>(`http://localhost:8080/api/tickets/${id}/ticket-checking`).subscribe({
            next: (res) => {
                if (res && res.status === 200) {
                    this.ticket = res.data;
                    this.loading = false;
                    Swal.fire('Thành công', 'Vé đã được xác nhận thành công!', 'success').then(() => {
                        this.checkTicket();
                    });

                } else {
                    this.error = res?.message || 'Cập nhật vé thất bại.';
                    this.ticket = null;
                    this.loading = false;
                }
            },
            error: (err) => {
                console.log('Lỗi chi tiết:', err);
                this.loading = false;
                this.ticket = null;

                if (typeof err.error === 'string') {
                    Swal.fire('Lỗi', err.error, 'error');
                } else if (err.error && err.error.message) {
                    Swal.fire('Lỗi', err.error.message, 'error');
                } else {
                    Swal.fire('Lỗi', 'Đã xảy ra lỗi khi kiểm tra vé.', 'error');
                }
            }


        });
    }

}
