import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../../services/invoice.service';
import { PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { InvoiceDetailFormComponent } from './invoice-detail-form/invoice-detail-form.component';

@Component({
    selector: 'app-invoice-management',
    templateUrl: './invoice-management.component.html',
    styleUrls: ['../admin-dashboard.scss', './invoice-management.component.scss']
})
export class InvoiceManagementComponent implements OnInit {
    invoices: any[] = [];
    pageSize: number = 5;
    pageNumber: number = 1;
    totalElements: number = 0;
    sort: string = 'id,asc';
    search: string = '';

    displayedColumns: string[] = ['id', 'profileName', 'profilePhone', 'totalAmount', 'createdAt', 'actions'];

    constructor(private invoiceService: InvoiceService, private dialog: MatDialog) { }

    ngOnInit(): void {
        this.loadInvoices();
    }

    onSortChange(sort: Sort): void {
        this.sort = `${sort.active},${sort.direction}`;
        this.pageNumber = 1;
        this.loadInvoices();
    }

    onPageChange(event: PageEvent): void {
        this.pageNumber = event.pageIndex + 1;
        this.pageSize = event.pageSize;
        this.loadInvoices();
    }

    loadInvoices(): void {
        this.invoiceService.getInvoices(this.pageSize, this.pageNumber, this.sort, this.search).subscribe(
            response => {
                this.invoices = response.data.content;
                this.totalElements = response.data.totalElements;
            },
            error => console.error('Lỗi khi tải hoá đơn: ', error)
        );
    }

    viewDetails(invoice: any): void {
        this.dialog.open(InvoiceDetailFormComponent, {
            data: invoice
        });
    }
}
