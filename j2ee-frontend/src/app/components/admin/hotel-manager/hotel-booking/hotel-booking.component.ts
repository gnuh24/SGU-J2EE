import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreateHotelBookingRequest } from '../../../../models/request/product/hotel/hotel-booking/create-hotelbooking-request';
import { CreateHotelBookingResponse } from '../../../../models/response/product/hotel/hotel-booking/create-hotelbooking-response';
import { UpdateHotelBookingRequest } from '../../../../models/request/product/hotel/hotel-booking/update-hotelbooking-request';
import { UpdateHotelBookingResponse } from '../../../../models/response/product/hotel/hotel-booking/update-hotelbooking-response';
import { GetHotelResponse } from '../../../../models/response/product/hotel/hotel/get-hotel-response';
import { GetHotelBookingResponse } from '../../../../models/response/product/hotel/hotel-booking/get-hotelbooking-response';
import { HotelService } from '../../../../services/product/hotel/hotel/hotel.service';
import { HotelbookingService } from '../../../../services/product/hotel/hotelbooking/hotelbooking.service';

@Component({
  selector: 'app-hotel-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hotel-booking.component.html',
  styleUrl: './hotel-booking.component.css'
})
export class HotelBookingComponent implements OnInit {
  createHotelBookingRequest: CreateHotelBookingRequest = new CreateHotelBookingRequest();
  updateHotelBookingRequest: UpdateHotelBookingRequest = new UpdateHotelBookingRequest();
  createHotelBookingResponse: CreateHotelBookingResponse = new CreateHotelBookingResponse();
  updateHotelBookingResponse: UpdateHotelBookingResponse = new UpdateHotelBookingResponse();

  hotelDetail: GetHotelResponse = new GetHotelResponse();
  hotelBooking: GetHotelBookingResponse = new GetHotelBookingResponse();

  getHotelResponse: GetHotelResponse[] = [];
  getHotelBookingResponse: GetHotelBookingResponse[] = [];
  getHotelBookingByIdHotel: GetHotelBookingResponse[] = [];
  hotelBookingFilter: GetHotelBookingResponse[] = [];
  filterHotel: GetHotelResponse[] = [];

  startTimeHotel: Date = new Date();
  endTimeHotel: Date = new Date();

  stateFilter = false;

  hotelSelectedId: number = 0;

  searchQuery = '';

  hotelSelected: GetHotelResponse = new GetHotelResponse();

  constructor(private hotelService: HotelService, private hotelBookingService: HotelbookingService) {}

  ngOnInit(): void {
    this.getAllHotels();
    this.getAllHotelBookings();
    this.updateDisplayedPages();
  }

  getAllHotels() {
    this.hotelService.getAllHotel().subscribe({
      next: (data) => {
        if (data) {
          this.getHotelResponse = data;
          this.filterHotel = data;
        }
      },
    });
  }

  getHotelBookingByIdHotel1(id: number) {
    this.hotelBookingService.getHotelByIdBooking(id).subscribe({
      next: (data) => {
        if (data) {
          this.getHotelBookingByIdHotel = data;
        }
      },
    });
  }

  getAllHotelBookings() {
    this.hotelBookingService.getAllHotelBooking().subscribe({
      next: (data) => {
        if (data) {
          this.getHotelBookingResponse = data;
          this.updatePagedBookings();
          this.updateDisplayedPages();
        }
      },
    });
  }

  isDisplayDetails: boolean = false;
  isUpdateBooking: boolean = false;
  isCreateBooking: boolean = false;
  selectedHotelId: number | null | undefined = null;
  isEditMode: boolean = false;

  currentPageBooking: number = 1;
  pageSize: number = 5;
  pagedBookings: GetHotelBookingResponse[] = [];
  totalPages: number = Math.ceil(this.getHotelBookingResponse.length / this.pageSize);
  pages: number[] = Array.from({ length: this.totalPages }, (_, i) => i + 1);

  currentPage = 1;
  itemsPerPage = 4;

  get paginatedHotels() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filterHotel.slice(start, start + this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < Math.ceil(this.filterHotel.length / this.itemsPerPage)) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  searchHotel() {
    if (this.searchQuery.trim() != '') {
      this.filterHotel = this.getHotelResponse.filter((hotel) =>
        hotel.name?.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  reset() {
    this.filterHotel = this.getHotelResponse;
  }

  addNewBooking(): void {
    this.createHotelBookingRequest.hotel = 0;
    this.isCreateBooking = true;
  }

  onCreate() {
    console.log(this.createHotelBookingRequest);
    console.log(this.startTimeHotel);
    console.log(this.endTimeHotel);

    const startDate = new Date(this.startTimeHotel);
    const endDate = new Date(this.endTimeHotel);
    let formattedStartDate = startDate.toISOString().slice(0, 19);

    if (this.createHotelBookingRequest.hotel == 0) {
      alert('Vui lòng chọn khách sạn để thêm.');
      return;
    }

    if (this.createHotelBookingRequest.totalPrice! < 0 || this.createHotelBookingRequest.totalPrice == null) {
      alert('Vui lòng điền đầy đủ thông tin.');
      return;
    }

    if (startDate < new Date()) {
      alert('Ngày bắt đầu không được nhỏ hơn ngày hiện tại.');
      return;
    }

    let isSuccess = false;

    if (startDate <= endDate) {
      while (startDate <= endDate) {
        const formData = new FormData();
        formData.append('hotel', this.createHotelBookingRequest.hotel?.toString() ?? '');
        formData.append('totalPrice', this.createHotelBookingRequest.totalPrice?.toString() ?? '');
        formData.append('startDate', formattedStartDate);
        formData.forEach((value, key) => {
          console.log(`${key}: ${value}`);
        });
        this.hotelBookingService.createBooking(formData).subscribe({
          next: (data) => {
            console.log(data);
            if (data) {
              this.createHotelBookingResponse = data;
              isSuccess = true;
            }
          },
          error: (error) => {
            console.error('Error creating booking:', error);
          },
        });

        startDate.setDate(startDate.getDate() + 1);
        formattedStartDate = startDate.toISOString().slice(0, 19);
      }
      alert('Create HotelBooking is success');
    } else {
      console.error('Start date must be less than or equal to end date.');
    }
  }

  closeCreate() {
    this.isCreateBooking = false;
  }

  updateBooking(booking?: GetHotelBookingResponse, hotelDetail?: GetHotelResponse) {
    if (booking != undefined && hotelDetail != undefined) {
      this.updateHotelBookingRequest = booking;
      this.hotelSelected = hotelDetail;
    } else {
      this.selectedHotelId = undefined;
    }
    this.isUpdateBooking = true;
    this.isEditMode = true;
  }

  cancelUpdate() {
    this.isUpdateBooking = false;
  }

  saveUpdate() {
    this.updateHotelBookingRequest;
    if (this.updateHotelBookingRequest) {
      const formData = new FormData();
      formData.append('id', this.updateHotelBookingRequest.id?.toString() ?? '');
      formData.append('hotel', this.updateHotelBookingRequest.hotel?.toString() ?? '');
      formData.append('totalPrice', this.updateHotelBookingRequest.totalPrice?.toString() ?? '');
      formData.append('startTime', this.updateHotelBookingRequest.startTime?.toString() ?? '');
      this.hotelBookingService.updateBooking(formData).subscribe({
        next: (data) => {
          if (data) {
            this.updateHotelBookingResponse = data;
            alert('Update Hotel Booking successfully!');
          }
        },
      });
    }
  }

  viewDetails(hotel: GetHotelResponse) {
    if (hotel != undefined && hotel.id) {
      this.hotelDetail = hotel;
      this.getHotelBookingByIdHotel1(hotel.id);
    }
    this.isDisplayDetails = true;
  }

  cancel() {
    this.isDisplayDetails = false;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPageBooking = page;
      this.updatePagedBookings();
      this.updateDisplayedPages();
    }
  }

  goToPageFilter(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPageBooking = page;
      this.updatePagedBookingFilter();
    }
  }

  filterBookings(): void {
    console.log(this.hotelSelectedId);
    if (this.hotelSelectedId != 0) {
      this.stateFilter = true;
      this.hotelBookingFilter = this.getHotelBookingResponse;
      this.hotelBookingFilter = this.getHotelBookingResponse.filter((booking) => booking.hotel == this.hotelSelectedId);
      this.updatePagedBookingFilter();
    } else {
      this.stateFilter = false;
      this.pagedBookings = this.getHotelBookingResponse.slice();
      this.updatePagedBookings();
      this.updateDisplayedPages();
    }
    console.log(this.pagedBookings);

    this.currentPageBooking = 1;
  }

  updatePagedBookingFilter(): void {
    const start = (this.currentPageBooking - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedBookings = this.hotelBookingFilter.slice(start, end);
    this.totalPages = Math.ceil(this.hotelBookingFilter.length / this.pageSize);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.updateDisplayedPages();
  }

  updatePagedBookings(): void {
    const start = (this.currentPageBooking - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedBookings = this.getHotelBookingResponse.slice(start, end);
    this.totalPages = Math.ceil(this.getHotelBookingResponse.length / this.pageSize);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  updateDisplayedPages(): void {
    const visiblePagesCount = 5;
    let startPage = Math.max(1, this.currentPageBooking - Math.floor(visiblePagesCount / 2));
    let endPage = Math.min(this.totalPages, startPage + visiblePagesCount - 1);

    if (endPage - startPage < visiblePagesCount - 1) {
      startPage = Math.max(1, endPage - visiblePagesCount + 1);
    }
    this.pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }
}
