import { CreateUserInfoRequest } from './../../../models/request/user/user-info/create-user-info-request';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Component, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from '../../../services/auth.interceptor';
import { UserService } from '../../../services/user/user.service';
import { Title } from '@angular/platform-browser';
import { GetBookingDetailResponse } from '../../../models/response/booking/get-booking-detail-response';
import { BookingService } from '../../../services/booking/booking.service';
import { Router } from '@angular/router';
import { OrderRequest } from '../../../models/request/booking/order-request';
import { OrderResponse } from '../../../models/response/booking/order-response';
import { CreateUserJoinRequest } from '../../../models/request/user/user-join/create-user-join-request';
import { TourService } from '../../../services/product/tour/tour/tour.service';
import { HotelService } from '../../../services/product/hotel/hotel/hotel.service';
import { TicketService } from '../../../services/product/ticket/ticket/ticket.service';
import { start } from 'repl';
import { GetTourResponse } from '../../../models/response/product/tour/tour/get-tour-response';
import { GetTourismResponse } from '../../../models/response/product/ticket/tourism/get-tourism-response';
import { GetHotelResponse } from '../../../models/response/product/hotel/hotel/get-hotel-response';
import { TourismService } from '../../../services/product/ticket/tourism/tourism.service';
import { HotelbookingService } from '../../../services/product/hotel/hotelbooking/hotelbooking.service';
import { TourScheduleService } from '../../../services/product/tour/tour-schedule/tour-schedule.service';
import { NotificationComponent } from '../../notification/notification.component';

@Component({
  selector: 'app-booking',
  standalone: true,
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    UserService
  ],
  imports: [FormsModule, CommonModule, HttpClientModule, NotificationComponent],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent implements OnInit {
  specialRequest: string = '';
  charCount: number = 0;
  hours: number[] = [];
  minutes: number[] = [];
  showForm: boolean = false;
  showContactForm: boolean = false;
  showEditForm: boolean = false;
  showContactEditForm: boolean = false;
  getBookingDetailResponse: GetBookingDetailResponse[] = [];
  products: any[] = [];
  idBooking: number | null = null;
  totalPrice: number | null = null;
  orderRequest: OrderRequest = new OrderRequest();
  orderResponse: OrderResponse = new OrderResponse();
  createUserInfoRequest: CreateUserInfoRequest[] = [];
  createUserInfo: CreateUserInfoRequest = new CreateUserInfoRequest();
  updateUserInfo: CreateUserInfoRequest = new CreateUserInfoRequest();
  createUserJoinRequest: CreateUserJoinRequest[] = [];
  createUserJoin: CreateUserJoinRequest = new CreateUserJoinRequest();
  updateUserJoin: CreateUserJoinRequest = new CreateUserJoinRequest();
  getTour: GetTourResponse[] = [];
  getTourism: GetTourismResponse[] = [];
  getHotel: GetHotelResponse[] = [];
  selectedContactIndex: number | null = null;
  selectedUserIndex: number | null = null;
  originalUserJoin: CreateUserJoinRequest;
  originalUserInfo: CreateUserInfoRequest;
  formInvalid: boolean = false;

  @ViewChild(NotificationComponent) notificationComponent!: NotificationComponent;
  constructor(
    private title: Title,
    @Inject(PLATFORM_ID) private platformId: Object,
    private bookingService: BookingService,
    private router: Router,
    private tourService: TourService,
    private tourScheduleService: TourScheduleService,
    private tourismService: TourismService,
    private hotelService: HotelService,
    private hotelBookingService: HotelbookingService,
    private ticketService: TicketService,
  ) {
    this.hours = Array.from({ length: 24 }, (_, i) => i);

    this.minutes = Array.from({ length: 60 }, (_, i) => (i) ? i : null).filter(n => n !== null);

    this.title.setTitle('Điền thông tin');
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const id = localStorage.getItem('idUser');
      if (id) {
        this.getBookingByUser(parseInt(id));
        console.log('ID:', this.products);
      }
    }
    this.originalUserJoin = new CreateUserJoinRequest();
  }

  updateCharCount() {
    this.charCount = this.specialRequest.length;
  }

  toggleForm() {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.createUserJoin = new CreateUserJoinRequest();
      this.selectedUserIndex = null;
      this.formInvalid = false;
    }
  }

  toggleContactForm() {
    this.showContactForm = !this.showContactForm;
    if (!this.showContactForm) {
      this.createUserInfo = new CreateUserInfoRequest();
      this.selectedContactIndex = null;
      this.formInvalid = false;
    }
  }

  toggleEditForm() {
    this.showEditForm = !this.showEditForm;
  }
  toggleContactEditForm() {
    this.showContactEditForm = !this.showContactEditForm;
  }

  saveInfo() {
    this.formInvalid = !this.isFormValid();

    if (this.originalUserJoin && (
      this.createUserJoin.firstName === this.originalUserJoin.firstName &&
      this.createUserJoin.lastName === this.originalUserJoin.lastName &&
      this.createUserJoin.phone === this.originalUserJoin.phone &&
      this.createUserJoin.email === this.originalUserJoin.email
    )) {
      this.notificationComponent.showNotification('error', 'Vui lòng chọn nội dung thay đổi.');
      return;
    }
    if (this.selectedUserIndex === null) {
      this.createUserJoinRequest.push({ ...this.createUserJoin });
    } else {
      this.createUserJoinRequest[this.selectedUserIndex] = { ...this.createUserJoin };
      this.selectedUserIndex = null;
    }

    this.createUserJoin = new CreateUserJoinRequest();
    console.log('First Name:', this.createUserJoin.firstName);
    console.log('Form Invalid:', this.formInvalid);


    this.toggleForm();
  }


  editUser(index: number) {
    this.selectedUserIndex = index;
    this.createUserJoin = { ...this.createUserJoinRequest[index] };
    this.originalUserJoin = { ...this.createUserJoin };
    this.showForm = true;
  }

  deleteUser(index: number) {
    this.createUserJoinRequest.splice(index, 1);
  }

  saveContactInfo() {
    this.formInvalid = !this.isContactFormValid();
    if (this.formInvalid && this.selectedContactIndex === null) {
      this.notificationComponent.showNotification('error', 'Vui lòng điền đầy đủ thông tin');
      return;
    }

    if (this.originalUserInfo && (
      this.createUserInfo.firstName === this.originalUserInfo.firstName &&
      this.createUserInfo.lastName === this.originalUserInfo.lastName &&
      this.createUserInfo.phone === this.originalUserInfo.phone &&
      this.createUserInfo.email === this.originalUserInfo.email
    )) {
      this.notificationComponent.showNotification('error', 'Vui lòng chọn nội dung thay đổi.');
      return;
    }
    if (this.selectedContactIndex === null) {
      this.createUserInfoRequest.push({ ...this.createUserInfo });
    } else {
      this.createUserInfoRequest[this.selectedContactIndex] = { ...this.createUserInfo };
      this.selectedContactIndex = null;
    }
    this.createUserInfo = new CreateUserInfoRequest();
    this.toggleContactForm();
  }

  editContact(index: number) {
    this.selectedContactIndex = index;
    this.createUserInfo = { ...this.createUserInfoRequest[index] };
    this.originalUserInfo = { ...this.createUserInfo };
    this.showContactForm = true;
  }

  deleteContact(index: number) {
    this.createUserInfoRequest.splice(index, 1);
  }

  updateInfo() {
    this.toggleEditForm();
  }

  updateContactInfo() {
    this.toggleContactEditForm();
  }

  getBookingByUser(id: number) {
    this.bookingService.getBookingByUser(id).subscribe({
      next: (response) => {
        if (response && response.id) {
          if (response.type === 'CART') {
            this.idBooking = response.id;
            this.getBookingDetail(response.id);
            this.totalPrice = response.totalPrice;
          } else {
            this.products = [];
          }

        } else {
        }
      },
      error: (error) => {
        console.log("Error:", error);
      }
    });
  }

  getBookingDetail(id: number) {
    this.bookingService.getDetailBooking(id).subscribe({
      next: (response) => {
        if (response) {
          console.log(response);
          this.getBookingDetailResponse = response;
          this.products = this.getBookingDetailResponse.map(detail => ({
            idBookingDetail: detail.id,
            id: detail.idTour || detail.idHotel || detail.idTicket,
            name: detail.idTour ? 'Tour' : detail.idHotel ? 'Khách sạn' : 'Vé',
            price: detail.totalPrice,
            quantity: detail.quantity,
            image: 'https://via.placeholder.com/100',
            type: detail.idTour ? 'tour' : detail.idHotel ? 'hotel' : 'ticket'
          }));

          if (this.products.some(p => p.type === 'tour')) {
            this.products.filter(p => p.type === 'tour').forEach(p => {
              //this.getTourDetail(p.id);
              this.tourScheduleService.getSchedule(p.id).subscribe({
                next: (scheduleResponse) => {
                  console.log(scheduleResponse);
                  p.schedule = scheduleResponse;
                  this.tourService.getTourById(scheduleResponse.idTour).subscribe({
                    next: (tourResponse) => {
                      p.name = tourResponse.name;
                      p.image = tourResponse.image
                      p.startLocation = tourResponse.startLocation;
                      p.endLocation = tourResponse.endLocation;
                    },
                    error: (error) => {
                      console.log("Error:", error);
                    }
                  })
                },
                error: (error: any) => {
                  console.log("Error:", error);
                }
              });

            });
          }

          if (this.products.some(p => p.type === 'hotel')) {
            this.products.filter(p => p.type === 'hotel').forEach(p => {
              this.hotelService.getHotelDetailById(p.id).subscribe({
                next: (hotelResponse) => {
                  p.name = hotelResponse.name;
                  p.image = hotelResponse.image;
                  p.location = hotelResponse.location;
                  this.hotelBookingService.getBooking(p.id).subscribe({
                    next: (hotelBookingResponse) => {
                      p.startDate = hotelBookingResponse.startDate;
                      p.endDate = hotelBookingResponse.endDate;
                    },
                    error: (error) => {
                      console.log("Error:", error);
                    }
                  });


                },
                error: (error) => {
                  console.log("Error:", error);
                }
              });
            });
          }


          if (this.products.some(p => p.type === 'ticket')) {
            this.products.filter(p => p.type === 'ticket').forEach(p => {
              console.log('Ticket ID:', p.id);
              this.ticketService.getTicket(p.id).subscribe({
                next: (ticketResponse) => {
                  console.log(ticketResponse);
                  p.dateEvent = ticketResponse.startDate;
                  this.tourismService.getTour(ticketResponse.idTourism).subscribe({
                    next: (scheduleTicketResponse) => {
                      console.log(scheduleTicketResponse);
                      p.image = scheduleTicketResponse.image;
                      p.venue = scheduleTicketResponse.location;
                      p.name = scheduleTicketResponse.name;
                    },
                    error: (error) => {
                      console.log("Error:", error);
                    }
                  });
                },
                error: (error) => {
                  console.log("Error:", error);
                }
              });
            });
          }
        }
      },
      error: (error) => {
        console.log("Error:", error);
      }
    });
  }

  onPayment() {
    const formData = new FormData();
    const idUser = localStorage.getItem('idUser');
    const idBooking = localStorage.getItem('idBooking');
    
    if (!this.createUserInfoRequest || this.createUserInfoRequest.length === 0) {
      this.notificationComponent.showNotification('error', 'Vui lòng điền ít nhất một thông tin người liên hệ');
      return;
    }
    if (!this.createUserJoinRequest || this.createUserJoinRequest.length === 0) {
      this.notificationComponent.showNotification('error', 'Vui lòng điền ít nhất một thông tin người tham gia');
      return;
    }


    formData.append('id', idBooking);
    formData.append('idUser', idUser);
    formData.append('dateBook', new Date().toISOString().slice(0, 19));
    formData.append('totalPrice', this.totalPrice.toString());
    formData.append('createUserInfoRequest', JSON.stringify(this.createUserInfoRequest));
    formData.append('createUserJoinRequest', JSON.stringify(this.createUserJoinRequest));
    formData.append('paymentMethod', 1 + "");

    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    this.bookingService.order(formData).subscribe({
      next: (response) => {
        if (response) {
          this.updateTypeBooking(parseInt(idBooking));
        }
      },
      error: (error) => {
        console.log('Payment error:', error);
      }
    })
  }

  updateTypeBooking(id: number) {
    this.bookingService.updateTypeBooking('PENDING', id).subscribe({
      next: (value) => {
        if (value) {
          console.log('successful');
          this.notificationComponent.showNotification('success', 'Bạn đã đặt thành công. Vui lòng kiểm tra Email và chờ phản hồi');
          setTimeout(() => {
            this.router.navigate(['order-history']);
          }, 2000);
          localStorage.removeItem('idBooking');
        }
      },
    });
  }

  validateForm() {
    this.formInvalid = !this.isFormValid();
  }


  isFormValid() {
    console.log('First Name:', this.createUserJoin.firstName);
    console.log('Form Invalid:', this.formInvalid);

    return this.createUserJoin.firstName &&
      this.createUserJoin.lastName &&
      this.createUserJoin.phone &&
      this.isValidPhone(this.createUserJoin.phone) &&
      this.createUserJoin.email &&
      this.isValidEmail(this.createUserJoin.email);
  }

  isContactFormValid() {
    return this.createUserInfo.firstName &&
      this.createUserInfo.lastName &&
      this.createUserInfo.phone &&
      this.isValidPhone(this.createUserInfo.phone) &&
      this.createUserInfo.email &&
      this.isValidEmail(this.createUserInfo.email);
  }



  isValidPhone(phone: string): boolean {
    const phonePattern = /^\d{10}$/; // Change the regex according to your requirements
    return phonePattern.test(phone);
  }

  isValidEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
    return emailPattern.test(email);
  }
}
