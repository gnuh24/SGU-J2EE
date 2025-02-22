import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../../services/booking/booking.service';
import { GetBookingResponse } from '../../../models/response/booking/get-booking-response';
import { RouterLink } from '@angular/router';
import { GetBookingDetailResponse } from '../../../models/response/booking/get-booking-detail-response';
import { TourService } from '../../../services/product/tour/tour/tour.service';
import { HotelService } from '../../../services/product/hotel/hotel/hotel.service';
import { TicketService } from '../../../services/product/ticket/ticket/ticket.service';
import { TourScheduleService } from '../../../services/product/tour/tour-schedule/tour-schedule.service';
import { TourismService } from '../../../services/product/ticket/tourism/tourism.service';
import { HotelbookingService } from '../../../services/product/hotel/hotelbooking/hotelbooking.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent implements OnInit {
  getBookingResponse: GetBookingResponse[] = [];
  products: any[] = [];
  getBookingDetailResponse: GetBookingDetailResponse[] = [];
  selectedOrder: any;

  orders = [
    {
      id: 1,
      date: '25/09/2024',
      type: 'Đặt Khách Sạn',
      hotelName: 'Khách sạn Grand Palace',
      checkIn: '01/10/2024',
      checkOut: '05/10/2024',
      total: 5000000
    },
    {
      id: 2,
      date: '20/09/2024',
      type: 'Đặt Xe',
      carType: 'Xe hơi',
      pickupLocation: 'Sân bay Nội Bài',
      dropOffLocation: 'Khách sạn Grand Palace',
      total: 1500000
    },
    {
      id: 3,
      date: '15/09/2024',
      type: 'Đặt Vé',
      event: 'Hòa nhạc BTS',
      venue: 'SVĐ Mỹ Đình',
      dateEvent: '10/10/2024',
      total: 3000000
    }
  ];

  constructor(private bookingService: BookingService,
    private tourService: TourService,
    private hotelService: HotelService,
    private ticketService: TicketService,
    private tourScheduleService: TourScheduleService,
    private tourismService: TourismService,
    private hotelBookingService: HotelbookingService,
    private title: Title,
  ) {this.title.setTitle('Lịch sử đặt hàng'); }

  ngOnInit(): void {
    this.getBookingByUser();
  }

  viewOrderDetails(orderId: number): void {
    this.getBookingDetail(orderId);
    this.selectedOrder = this.getBookingResponse.find(order => order.id === orderId);
  }

  getBookingByUser() {
    const idUser = localStorage.getItem('idUser');

    this.bookingService.getHistoryBooking(parseInt(idUser)).subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.getBookingResponse = data;
          this.getBookingDetail(data[0].id);
        } else {
          this.products = [];
        }
      }
    })
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
            type: detail.idTour ? 'tour' : detail.idHotel ? 'hotel' : 'ticket',
            schedule: null,
            startDate: null,
            endDate: null,
            description: null,
            venue: null,
            dateEvent: null,
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
      }
    });
  }
}
