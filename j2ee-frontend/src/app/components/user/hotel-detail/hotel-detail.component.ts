import { Component, Input, ViewChild } from '@angular/core';
import { GetHotelDetailResponse } from '../../../models/response/product/hotel/hotel/get-hotel-detail-response';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from '../../../services/product/hotel/hotel/hotel.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from '../../../services/auth.interceptor';
import { UserService } from '../../../services/user/user.service';
import { BookingService } from '../../../services/booking/booking.service';
import { AddBookingHotelRequest } from '../../../models/request/booking/add-booking-hotel-request';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { HotelbookingService } from '../../../services/product/hotel/hotelbooking/hotelbooking.service';
import { GetHotelBookingResponse } from '../../../models/response/product/hotel/hotel-booking/get-hotelbooking-response';
import { FormsModule } from '@angular/forms';
import { UpdateBookingResponse } from '../../../models/response/booking/update-booking-response';
import { UpdateBookingHotelResponse } from '../../../models/response/booking/update-hotel-booking-response';
import { NotificationComponent } from '../../notification/notification.component';

@Component({
  selector: 'app-hotel-detail',
  standalone: true,
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    UserService
  ],
  imports: [HttpClientModule, CommonModule, FormsModule,NotificationComponent],
  templateUrl: './hotel-detail.component.html',
  styleUrl: './hotel-detail.component.css'
})
export class HotelDetailComponent {
  @Input() location: string | null = null;
  isExpanded = false;
  locationId: string | null = null;
  locations?: GetHotelDetailResponse;
  startDate: Date | null = null;
  endDate: Date | null = null;
  totalPrice: number = 0;
  nights: number = 1;
  listHotel: GetHotelBookingResponse[] = [];
  selectedTourSchedule?: number | null = null;
  selectedPrice?: number | null = null;

  updateBookingResponse: UpdateBookingHotelResponse = new UpdateBookingHotelResponse();

  @ViewChild(NotificationComponent) notificationComponent!: NotificationComponent;

  toggleContent(event: Event) {
    event.preventDefault();
    this.isExpanded = !this.isExpanded;
  }


  constructor(private route: ActivatedRoute,
    private hotelService: HotelService,
    private bookingService: BookingService,
    private router: Router,
    private title: Title,
    private hotelBooking: HotelbookingService
  ) { this.title.setTitle("Chi tiết khách sạn"); }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.locationId = params.get('id');
      if (this.locationId) {
        this.getHotelDetailById(parseInt(this.locationId));
        this.getHotelByIdBooking(parseInt(this.locationId));
      }
    });
  }

  calculateTotalPrice() {
    if (this.startDate && this.endDate) {
      this.nights = this.calculateDateDifference(this.startDate, this.endDate);
      if (this.locations != undefined && this.locations.pricePerNight) {
        this.totalPrice = this.nights * this.locations?.pricePerNight; // Tính tổng giá dựa trên số đêm
      }
    } else {
      this.totalPrice = 0; // Đặt lại tổng giá nếu không có ngày
    }
  }

  calculateDateDifference(start: Date, end: Date): number {
    const startTime = start.getTime();
    const endTime = end.getTime();
    const timeDifference = endTime - startTime;
    return Math.ceil(timeDifference / (1000 * 3600 * 24)); // Chuyển đổi từ mili giây sang ngày
  }
  onStartDateChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const selectedStartDate = new Date(target.value);
    const currentDate = new Date();

    // Kiểm tra nếu ngày bắt đầu nhỏ hơn ngày hiện tại
    if (selectedStartDate < currentDate) {
      this.notificationComponent.showNotification('error', 'Ngày bắt đầu không được nhỏ hơn ngày hiện tại');
      target.value = ''; // Xóa giá trị
      this.startDate = null;
      return;
    }

    this.startDate = selectedStartDate;

    // Tự động cập nhật ngày kết thúc nếu chưa chọn
    if (!this.endDate) {
      this.endDate = new Date(selectedStartDate);
      this.endDate.setDate(this.endDate.getDate() + 1); // Thêm một ngày
    }

    // Tính toán lại giá
    this.calculateTotalPrice();
  }

  onEndDateChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.endDate = new Date(target.value);

    if (this.endDate && this.startDate && this.endDate < this.startDate) {
      this.notificationComponent.showNotification('error', 'Ngày kết thúc không được nhỏ hơn ngày bắt đầu');
      target.value = ''; // Xóa giá trị
      this.endDate = null;
    }

    // Tính toán lại giá nếu ngày kết thúc được chọn
    if (this.endDate) {
      this.calculateTotalPrice();
    }
  }

  clearDates() {
    this.startDate = null;
    this.endDate = null;
    (document.getElementById('startDate') as HTMLInputElement).value = '';
    (document.getElementById('endDate') as HTMLInputElement).value = '';
  }

  checkRoomStatus() {
  }


  getHotelDetailById(id: number) {
    this.hotelService.getHotelDetailById(id).subscribe(response => {
      if (response) {
        this.locations = response;
      } else {
      }
    }, error => {
      console.log("Error:", error);
    });
  }


  getHotelByIdBooking(id: number) {
    this.hotelBooking.getHotelByIdBooking(id).subscribe(response => {
      if (response) {
        const currentDate = new Date();
        this.listHotel = response
          .filter(ticket => {
            const startDate = new Date(ticket.startDate || '');
            return startDate >= currentDate; 
          })
          .sort((a, b) => {
            const dateA = new Date(a.startDate || '');
            const dateB = new Date(b.startDate || '');
            return dateA.getTime() - dateB.getTime(); 
          });
      } 
      if (this.listHotel.length > 0) {
        this.selectedTourSchedule = this.listHotel[0].id;
        this.onTourScheduleChange();
      }
    });
  }

  addBookingHotel(locationId: string | null) {
    if (!this.selectedTourSchedule) {
      this.notificationComponent.showNotification('error', 'Please select a hotel');
      return;
    }


    this.calculateTotalPrice();
    const id = locationId ? parseInt(locationId) : 0;
    const addBookingHotelRequest = new AddBookingHotelRequest();
    const idUser = localStorage.getItem('idUser');
    const idBooking = localStorage.getItem('idBooking');
    addBookingHotelRequest.idHotel = id;
    addBookingHotelRequest.idUser = idUser ? parseInt(idUser) : 0;
    addBookingHotelRequest.quantity = this.nights;
    addBookingHotelRequest.totalPrice = 100;


    if(!idUser){
      this.notificationComponent.showNotification('error', 'Vui lòng đăng nhập để thêm vào giỏ hàng');
      setTimeout(() => {
        this.router.navigate(['/auth/login']);
      }, 2000);
      return;
    }

    // Chuyển đổi thành FormData
    const formData = new FormData();
    formData.append('idHotel', this.selectedTourSchedule?.toString() || "");
    formData.append('idBooking', idBooking || '');
    formData.append('idUser', addBookingHotelRequest.idUser.toString());
    formData.append('quantity', addBookingHotelRequest.quantity.toString());
    formData.append('totalPrice', this.totalPrice.toString());
    // if (this.startDate && this.endDate) {
    //   formData.append('startDate', this.startDate.toString());
    //   formData.append('endDate', this.endDate.toString());
    // }



    if (this.startDate != undefined && this.endDate != undefined) {
      const startDate = new Date(this.startDate);
      const startDateWithoutTimezone = startDate.toISOString().slice(0, 19);
      formData.append('startDate', startDateWithoutTimezone);
      const endDate = new Date(this.endDate);
      const endDateWithoutTimezone = endDate.toISOString().slice(0, 19);
      formData.append('endDate', endDateWithoutTimezone);
    }

    this.bookingService.addBookingHotel(formData).subscribe({
      next: response => {
        if (response) {
          console.log(response);
          if (idBooking == null) {
            localStorage.setItem('idBooking', response.idBooking + "");
          }
          this.notificationComponent.showNotification('success', 'Thêm vào giỏ hàng thành công');
        }
      }
    })
  }


  onTourScheduleChange() {
    const selectedSchedule = this.listHotel.find(schedule => {
      return schedule.id === Number(this.selectedTourSchedule);
    });

    if (selectedSchedule) {
      this.selectedPrice = selectedSchedule.totalPrice || null;
    }
    else {
      this.selectedPrice = null;
    }

  }

}
