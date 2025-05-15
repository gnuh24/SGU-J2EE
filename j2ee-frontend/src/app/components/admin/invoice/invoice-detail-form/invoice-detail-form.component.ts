import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InvoiceService } from '../../../../services/invoice.service';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'app-invoice-detail-form',
    templateUrl: './invoice-detail-form.component.html',
    styleUrls: ['../../admin-dialog.scss',
        './invoice-detail-form.component.scss']
})
export class InvoiceDetailFormComponent implements OnInit {
    invoiceForm: FormGroup;
    tickets: any[] = [];
    isLoading = false;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<InvoiceDetailFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { id: string },
        private invoiceService: InvoiceService
    ) { }

    ngOnInit(): void {
        this.invoiceForm = this.fb.group({
            id: [''],
            profileFullname: [''],
            profilePhone: [''],
            paymentMethod: [''],
            paymentStatus: [''],
            createdAt: [''],
            totalAmount: [''],
            transactionId: [''],      // NEW
            paymentNote: [''],        // NEW
            paymentTime: ['']         // NEW
        });


        if (this.data?.id) {
            this.loadInvoiceDetail(this.data.id);
        }
    }

    loadInvoiceDetail(id: string): void {
        this.invoiceService.getInvoiceById(id)
            .pipe(finalize(() => this.isLoading = false))

            .subscribe({
                next: (res: any) => {
                    const invoice = res.data;
                    console.log('Hoá đơn:', invoice);
                    this.tickets = invoice.tickets || [];
                    this.invoiceForm.patchValue({
                        id: invoice.id,
                        profileFullname: invoice.profileFullname,
                        profilePhone: invoice.profilePhone,
                        paymentMethod: invoice.paymentMethod,
                        paymentStatus: invoice.paymentStatus,
                        createdAt: this.formatDateTime(invoice.createdAt),
                        totalAmount: invoice.totalAmount,
                        transactionId: invoice.transactionId,                     // NEW
                        paymentNote: invoice.paymentNote,                         // NEW
                        paymentTime: this.formatDateTime(invoice.paymentTime)     // NEW
                    });

                },
                error: (err: any) => {
                    console.error('Lỗi khi tải hoá đơn:', err);
                }
            });
    }

    formatDateTime(datetime: string): string {
        const date = new Date(datetime);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    }

    onClose(): void {
        this.dialogRef.close();
    }
}
