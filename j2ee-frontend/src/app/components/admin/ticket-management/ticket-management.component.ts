import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../../services/ticket.service';
import { PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { TicketDetailFormComponent } from './ticket-detail-form/ticket-detail-form.component';

@Component({
	selector: 'app-ticket-management',
	templateUrl: './ticket-management.component.html',
	styleUrls: ['../admin-dashboard.scss', './ticket-management.component.scss']
})
export class TicketManagementComponent implements OnInit {
	tickets: any[] = [];
	pageSize: number = 5;
	pageNumber: number = 1;
	totalElements: number = 0;
	sort: string = 'id,asc';
	search: string = '';

	displayedColumns: string[] = ['id', 'coachLicensePlate', 'departureTime', 'seatNumber', 'price', 'createdAt', 'actions'];

	constructor(private ticketService: TicketService, private dialog: MatDialog) { }

	ngOnInit(): void {
		this.loadTickets();
	}

	onSortChange(sort: Sort): void {
		this.sort = `${sort.active},${sort.direction}`;
		this.pageNumber = 1;
		this.loadTickets();
	}

	onPageChange(event: PageEvent): void {
		this.pageNumber = event.pageIndex + 1;
		this.pageSize = event.pageSize;
		this.loadTickets();
	}

	loadTickets(): void {
		this.ticketService.getTickets(this.pageSize, this.pageNumber, this.sort, this.search).subscribe(
			response => {
				this.tickets = response.data.content;
				this.totalElements = response.data.totalElements;
			},
			error => console.error('Lỗi khi tải danh sách vé: ', error)
		);
	}

	viewDetails(ticket: any): void {
		this.dialog.open(TicketDetailFormComponent, {
			data: ticket
		});
	}
}
