import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GetTourismResponse } from '../../../../models/response/product/ticket/tourism/get-tourism-response';
import { GetTicketResponse } from '../../../../models/response/product/ticket/ticket/get-ticket-response';
import { TicketService } from '../../../../services/product/ticket/ticket/ticket.service';
import { TourismService } from '../../../../services/product/ticket/tourism/tourism.service';
import { CreateTicketRequest } from '../../../../models/request/product/ticket/ticket/create-ticket-request';
import { UpdateTicketRequest } from '../../../../models/request/product/ticket/ticket/update-ticket-request';
import { CreateTicketResponse } from '../../../../models/response/product/ticket/ticket/create-ticket-response';
import { UpdateTicketResponse } from '../../../../models/response/product/ticket/ticket/update-ticket-response';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  createTicketRequest: CreateTicketRequest = new CreateTicketRequest();
  updateTicketRequest: UpdateTicketRequest = new UpdateTicketRequest();
  createTicketResponse: CreateTicketResponse = new CreateTicketResponse();
  updateTicketResponse: UpdateTicketResponse = new UpdateTicketResponse();

  tourismDetail: GetTourismResponse = new GetTourismResponse();
  ticketDetail: GetTicketResponse = new GetTicketResponse();

  getTourismResponse: GetTourismResponse[] = [];
  filterTourism: GetTourismResponse[] = [];
  getTicketResponse: GetTicketResponse[] = [];
  filterTicket: GetTicketResponse[] = [];
  getTicketsByTourismId: GetTicketResponse[] = [];

  startDate: Date = new Date();
  endDate: Date = new Date();

  stateFilter = false;

  selectedTourismId: number = 0;
  selectedTourism: GetTourismResponse = new GetTourismResponse();

  constructor(private ticketService: TicketService, private tourismService: TourismService) {}

  ngOnInit(): void {
    this.getAllTourism();
    this.getAllTickets();
    this.updateDisplayedPages();
  }

  getAllTourism() {
    this.tourismService.getAllTourism().subscribe({
      next: (data) => {
        if (data) {
          this.getTourismResponse = data;
          this.filterTourism = this.getTourismResponse;
        }
      },
    });
  }

  getTicketsByTourism(id: number) {
    this.ticketService.getTicketByIdTourism(id).subscribe({
      next: (data) => {
        if (data) {
          this.getTicketsByTourismId = data;
        }
      },
    });
  }

  getAllTickets() {
    this.ticketService.getAllTickets().subscribe({
      next: (data) => {
        if (data) {
          this.getTicketResponse = data;
          this.updatePagedTickets();
          this.updateDisplayedPages();
        }
      },
    });
  }

  isDisplayDetails: boolean = false;
  isUpdateTicket: boolean = false;
  isCreateTicket: boolean = false;
  selectedTicketId: number | null | undefined = null;
  isEditMode: boolean = false;

  searchQuery='';

  currentPageTicket: number = 1;
  pageSize: number = 5;
  pagedTickets: GetTicketResponse[] = [];
  totalPages: number = Math.ceil(this.getTicketResponse.length / this.pageSize);
  pages: number[] = Array.from({ length: this.totalPages }, (_, i) => i + 1);

  currentPage = 1;
  itemsPerPage = 4;

  get paginatedTourisms() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filterTourism.slice(start, start + this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < Math.ceil(this.filterTourism.length / this.itemsPerPage)) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  searchTour() {
    if (this.searchQuery.trim() != '') {
      this.filterTourism = this.getTourismResponse.filter(tour =>
        tour.name?.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  reset() {
    this.filterTourism = this.getTourismResponse;
    this.filterTicket = this.getTicketResponse;
    this.updatePagedTickets();
    this.updateDisplayedPages();
  }

  aaddNewTicket(): void {
    this.createTicketRequest = new CreateTicketRequest();
    this.createTicketRequest.idTourism = 0;
    this.isCreateTicket = true;
  }

  onCreate() {
    const startDate = new Date(this.startDate);
    const endDate = new Date(this.endDate);
    let formattedStartDate = startDate.toISOString().slice(0, 19);
    let formattedEndDate = endDate.toISOString().slice(0, 19);
    let isSuccess = false;

    if (startDate < new Date()) {
      alert('Start date cannot be in the past.');
      return;
    }

    if (startDate <= endDate) {
      while (startDate <= endDate) {
        const formData = new FormData();
        formData.append('idTourism', this.createTicketRequest.idTourism?.toString() ?? '');
        formData.append('tourPrice', this.createTicketRequest.tourPrice?.toString() ?? '');
        formData.append('startDate', formattedStartDate);

        this.ticketService.createTicket(formData).subscribe({
          next: (data) => {
            if (data) {
              this.createTicketResponse = data;
              isSuccess = true;
            }
          },
          error: (error) => {
            console.error('Error creating ticket:', error);
          },
        });

        startDate.setDate(startDate.getDate() + 1);
        formattedStartDate = startDate.toISOString().slice(0, 19);
      }

      if (isSuccess) {
        alert('Ticket created successfully.');
      } else {
        alert('Failed to create ticket.');
      }
    } else {
      console.error('Start date must be less than or equal to end date.');
    }
  }

  closeCreate() {
    this.isCreateTicket = false;
  }

  formatDate(dateString: string): string {
    return dateString.slice(0, 10);
  }

  updateTicket(ticket?: GetTicketResponse, tourismDetail?: GetTourismResponse) {
    if (ticket && tourismDetail) {
      console.log(ticket);
      this.updateTicketRequest = ticket;
      this.selectedTourism = tourismDetail;
    } else {
      this.selectedTicketId = undefined;
    }
    this.isUpdateTicket = true;
    this.isEditMode = true;
  }

  cancelUpdate() {
    this.isUpdateTicket = false;
  }

  saveUpdate() {
    if (this.updateTicketRequest) {
      console.log(this.updateTicketRequest);
  
      const formData = new FormData();
      formData.append('id', this.updateTicketRequest.id?.toString() ?? '');
      formData.append('idTourism', this.updateTicketRequest.idTourism?.toString() ?? '');
      formData.append('tourPrice', this.updateTicketRequest.tourPrice?.toString() ?? '');
  
      if(this.updateTicketRequest.startDate!=undefined){
        const startDate = new Date(this.updateTicketRequest.startDate);  
        const startDateWithoutTimezone = startDate.toISOString().slice(0, 19);
        formData.append('startDate', startDateWithoutTimezone);           
      }
      this.ticketService.updateTicket(formData).subscribe({
        next: (data) => {
          if (data) {
            this.updateTicketResponse = data;
            alert('Ticket updated successfully!');
          }
        },
      });
    }
  }

  viewDetails(tourism: GetTourismResponse) {
    if (tourism && tourism.id) {
      this.tourismDetail = tourism;
      this.getTicketsByTourism(tourism.id);
    }
    this.isDisplayDetails = true;
  }

  cancel() {
    this.isDisplayDetails = false;
  }

  filterTickets(): void {
    if (this.selectedTourismId != 0) {
      this.stateFilter = true;
      this.filterTicket = this.getTicketResponse.filter(ticket => ticket.idTourism == this.selectedTourismId);
      this.currentPage = 1; // Reset về trang đầu tiên khi lọc
      this.updatePagedTicketFilter();
    } else {
      this.stateFilter = false;
      this.pagedTickets = this.getTicketResponse.slice();
      this.currentPageTicket = 1; // Reset về trang đầu tiên khi không lọc
      this.updatePagedTickets();
    }
    this.updateDisplayedPages();
  }
  
  
  updatePagedTicketFilter(): void {
    const start = (this.currentPageTicket - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedTickets = this.filterTicket.slice(start, end);
    this.totalPages = Math.ceil(this.filterTicket.length / this.pageSize);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.updateDisplayedPages();
  }

  
  goToPageFilter(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPageTicket = page;
      this.updatePagedTicketFilter();
      this.updateDisplayedPages();
    }
  }
  

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPageTicket = page;
      this.updatePagedTickets();
      this.updateDisplayedPages();
    }
  }

  updatePagedTickets(): void {
    const start = (this.currentPageTicket - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedTickets = this.getTicketResponse.slice(start, end);
    this.totalPages = Math.ceil(this.getTicketResponse.length / this.pageSize);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  updateDisplayedPages(): void {
    const visiblePagesCount = 5;
    let startPage = Math.max(1, this.currentPageTicket - Math.floor(visiblePagesCount / 2));
    let endPage = Math.min(this.totalPages, startPage + visiblePagesCount - 1);

    if (endPage - startPage < visiblePagesCount - 1) {
      startPage = Math.max(1, endPage - visiblePagesCount + 1);
    }

    this.pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }
}
