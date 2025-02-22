import { GetTourismResponse } from './../../../models/response/product/ticket/tourism/get-tourism-response';
import { GetTourResponse } from './../../../models/response/product/tour/tour/get-tour-response';
import { GetHotelResponse } from './../../../models/response/product/hotel/hotel/get-hotel-response';
import { TicketService } from './../../../services/product/ticket/ticket/ticket.service';
import { GetHotelBookingResponse } from './../../../models/response/product/hotel/hotel-booking/get-hotelbooking-response';
import { Router } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Component, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from '../../../services/auth.interceptor';
import { UserService } from '../../../services/user/user.service';
import { GetBookingDetailResponse } from '../../../models/response/booking/get-booking-detail-response';
import { BookingService } from '../../../services/booking/booking.service';
import { TourService } from '../../../services/product/tour/tour/tour.service';
import { HotelService } from '../../../services/product/hotel/hotel/hotel.service';
import { TourismService } from '../../../services/product/ticket/tourism/tourism.service';
import { Title } from '@angular/platform-browser';
import { GetTicketResponse } from '../../../models/response/product/ticket/ticket/get-ticket-response';
import { GetTourScheduleResponse } from '../../../models/response/product/tour/tour-schedule/get-tour-schedule-response';
import { TourScheduleStatusService } from '../../../services/product/tour/tour-schedule-status/tour-schedule-status.service';
import { HotelbookingService } from '../../../services/product/hotel/hotelbooking/hotelbooking.service';
import { TourScheduleService } from '../../../services/product/tour/tour-schedule/tour-schedule.service';
import { forkJoin, Observable } from 'rxjs';
import { NotificationComponent } from '../../notification/notification.component';


@Component({
  selector: 'app-cart',
  standalone: true,
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    UserService
  ],
  imports: [FormsModule, CommonModule, HttpClientModule,NotificationComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  getBookingDetailResponse: GetBookingDetailResponse[] = [];
  getHotelBookingResponse: GetHotelBookingResponse[] = [];
  getTicketResponse: GetTicketResponse[] = [];
  getTourScheduleResposne: GetTourScheduleResponse[] = [];

  getHotelResponse: GetHotelResponse[]=[];
  getTourResponse: GetTourResponse[] =[];
  getTourismResponse: GetTourismResponse[]=[]; 
  

  products: any[] = [];
  idBooking: number | null = null;

  @ViewChild(NotificationComponent) notificationComponent!: NotificationComponent;

  constructor(private bookingService: BookingService,
    private tourService: TourService,
    private tourScheduleService: TourScheduleService,
    private ticketService: TicketService,
    private hotelService: HotelService,
    private hotelBookingService: HotelbookingService,
    private tourismService: TourismService,
    private title: Title,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) { this.title.setTitle('Giỏ hàng'); }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const id = localStorage.getItem('idUser');
      if (id) {
        this.getBookingByUser(parseInt(id));
      }
    }
  }



  get total() {
    return this.products.reduce((sum, product) => sum + product.price, 0);
  }

  updateProductTotalPrice(product: any) {
    product.price = product.originalPrice * product.quantity;
  }


  increaseQuantity(product: any) {
    product.quantity++;
    this.updateProductQuantity(product);
    this.updateProductTotalPrice(product);
  }

  decreaseQuantity(product: any) {
    if (product.quantity > 1) {
      product.quantity--;
      this.updateProductQuantity(product);
      this.updateProductTotalPrice(product);
    }
  }



  getBookingByUser(id: number) {
    this.bookingService.getBookingByUser(id).subscribe({
      next: (response) => {
        if (response && response.id) {
          if (response.type === 'CART') {
            this.idBooking = response.id;
            this.getBookingDetail(response.id);
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
          this.getBookingDetailResponse = response;
          this.products = this.getBookingDetailResponse.map(detail => ({
            idBookingDetail: detail.id,
            id: detail.idTour || detail.idHotel || detail.idTicket,
            name: detail.idTour ? 'Tour' : detail.idHotel ? 'Khách sạn' : 'Vé',
            price: detail.totalPrice,
            originalPrice: detail.totalPrice / detail.quantity,
            quantity: detail.quantity,
            image: 'https://via.placeholder.com/100',
            type: detail.idTour ? 'tour' : detail.idHotel ? 'hotel' : 'ticket',

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


  getTourDetail(id: number) {
    this.tourService.getTourDetailById(id).subscribe({
      next: (response) => {
        if (response) {
          this.getTourResponse.push(response);
        }
      },
      error: (error) => {
        console.log("Error:", error);
      }
    });
  }

  getHotelDetailById(id: number) {
    this.hotelService.getHotelDetailById(id).subscribe({
      next: (response) => {
        if (response) {
          this.getHotelResponse.push(response);
        } else {
          console.log("Thất bại");
        }
      },
      error: (error) => {
        console.log("Error:", error);
      }
    });
  }

  getTicketDetailById(id: number) {
    this.tourismService.getTourismDetailById(id).subscribe({
      next: (response) => {
        if (response) {
          this.getTourismResponse.push(response);
        } else {
        }
      },
      error: (error) => {
        console.log("Error:", error);
      }
    });
  }

  updateBookingType() {
    const type = 'CART';
    if (this.products.length === 0) {
        this.notificationComponent.showNotification('error', 'Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm vào giỏ hàng trước khi tiến hành thanh toán');
        return; 
    }

    const pastProducts = this.products.filter(product => {
        if (product.type === 'tour') {
            return this.isPastStartDate(product.schedule?.timeStartTour);
        } else if (product.type === 'hotel') {
            return this.isPastStartDate(product.startDate);
        } else if (product.type === 'ticket') {
            return this.isPastStartDate(product.dateEvent);
        }
        return false;
    });

    if (pastProducts.length > 0) {
        const pastProductNames = pastProducts.map(p => `${p.name}`).join(', ');
        // alert(`Một hoặc nhiều sản phẩm trong giỏ hàng của bạn đã quá thời gian. Vui lòng xóa chúng trước khi tiến hành thanh toán: ${pastProductNames}`);
        this.notificationComponent.showNotification('error', `Một hoặc nhiều sản phẩm trong giỏ hàng của bạn đã quá thời gian. Vui lòng xóa chúng trước khi tiến hành thanh toán: ${pastProductNames}`);
        return;
    }

    if (this.idBooking) {
        const confirmed = window.confirm("Bạn có chắc chắn muốn thanh toán không?");
        if (confirmed) {
            this.router.navigate(['/booking']);
        }
    }
}



  updateProductQuantity(product: any) {
    const formData = new FormData();
    formData.append('idBooking', product.idBookingDetail.toString());
    formData.append('quantity', product.quantity.toString());
    // Kiểm tra loại sản phẩm và thêm đúng tham số
    if (product.type === 'tour') {
      this.bookingService.updateQuantityTour(formData).subscribe({
        next: (response) => {
        },
        error: (error) => {
          console.log('Lỗi khi cập nhật số lượng tour', error);
        }
      });
    } else if (product.type === 'hotel') {
      this.bookingService.updateQuantityHotel(formData).subscribe({
        next: (response) => {
        },
        error: (error) => {
          console.log('Lỗi khi cập nhật số lượng khách sạn', error);
        }
      });
    } else if (product.type === 'ticket') {
      this.bookingService.updateQuantityTourism(formData).subscribe({
        next: (response) => {
        },
        error: (error) => {
          console.log('Lỗi khi cập nhật số lượng vé', error);
        }
      });
    }

  }

  removeProduct(product: any) {
    const confirmed = window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?');
    if (confirmed) {
      this.products = this.products.filter(p => p.idBookingDetail !== product.idBookingDetail);
      this.bookingService.deleteBookingDetail(product.idBookingDetail).subscribe({
        next: (response) => {
          console.log('Sản phẩm đã được xóa thành công:', response);
        },
        error: (error) => {
          console.log('Lỗi khi xóa sản phẩm:', error);
        }
      });
    }
  }

  isPastStartDate(startDate: string): boolean {
    const now = new Date();
    const start = new Date(startDate);
    return now > start;
  }

}
