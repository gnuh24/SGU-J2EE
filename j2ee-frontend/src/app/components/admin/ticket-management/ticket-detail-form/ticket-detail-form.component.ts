import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TicketService } from '../../../../services/ticket.service';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'app-ticket-detail-form',
    templateUrl: './ticket-detail-form.component.html',
    styleUrls: ['../../admin-dialog.scss',
        './ticket-detail-form.component.scss']
})
export class TicketDetailFormComponent implements OnInit {
    ticketForm: FormGroup;
    isSubmitting = false;
    isLoading = false;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<TicketDetailFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { id: string },
        private ticketService: TicketService
    ) { }

    ngOnInit(): void {
        this.ticketForm = this.fb.group({
            id: [{ value: '', disabled: true }],
            price: [{ value: '', disabled: true }],
            status: ['', Validators.required],
            createdAt: [{ value: '', disabled: true }],

            seatNumber: [{ value: '', disabled: true }],
            seatType: [{ value: '', disabled: true }],
            isNextToWindow: [{ value: '', disabled: true }],
            seatFloor: [{ value: '', disabled: true }],

            coachLicensePlate: [{ value: '', disabled: true }],
            coachType: [{ value: '', disabled: true }],
            coachCapacity: [{ value: '', disabled: true }],

            scheduleDepartureTime: [{ value: '', disabled: true }],
            scheduleArrivalTime: [{ value: '', disabled: true }],

            routeDeparture: [{ value: '', disabled: true }],
            routeDestination: [{ value: '', disabled: true }],
            routeDistance: [{ value: '', disabled: true }],
            routeDuration: [{ value: '', disabled: true }]
        });

        if (this.data?.id) {
            this.loadTicketDetail(this.data.id);
        }
    }

    loadTicketDetail(id: string): void {
        this.isLoading = true;
        this.ticketService.getTicketById(id)
            .pipe(finalize(() => this.isLoading = false))
            .subscribe({
                next: (res) => {
                    const t = res.data;

                    this.ticketForm.patchValue({
                        id: t.id,
                        price: t.price,
                        status: t.status,
                        createdAt: this.formatDateTime(t.createdAt),

                        seatNumber: t.seat?.number,
                        seatType: t.seat?.type,
                        isNextToWindow: t.seat?.isNextToWindow ? 'Có' : 'Không',
                        seatFloor: t.seat?.floor,

                        coachLicensePlate: t.coach?.licensePlate,
                        coachType: t.coach?.type,
                        coachCapacity: t.coach?.capacity,

                        scheduleDepartureTime: t.schedule?.departureTime,
                        scheduleArrivalTime: t.schedule?.arrivalTime,

                        routeDeparture: t.route?.departure,
                        routeDestination: t.route?.destination,
                        routeDistance: t.route?.distance,
                        routeDuration: t.route?.duration
                    });
                },
                error: (err) => {
                    console.error('Lỗi khi tải chi tiết vé:', err);
                }
            });
    }

    // Hàm định dạng ngày giờ nếu cần
    formatDateTime(datetime: string): string {
        const date = new Date(datetime);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    }


    onSubmit(): void {
        if (this.ticketForm.invalid) return;

        this.isSubmitting = true;
        const updatedStatus = {
            status: this.ticketForm.get('status')?.value
        };

        this.ticketService.updateTicket(this.data.id, updatedStatus)
            .pipe(finalize(() => this.isSubmitting = false))
            .subscribe({
                next: () => {
                    this.dialogRef.close(true);
                },
                error: (err) => {
                    console.error('Lỗi cập nhật vé:', err);
                }
            });
    }

    onCancel(): void {
        this.dialogRef.close();
    }
}
