import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, PLATFORM_ID, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TourService } from '../../../services/product/tour/tour/tour.service';
import { GetTourResponse } from '../../../models/response/product/tour/tour/get-tour-response';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from '../../../services/auth.interceptor';
import { UserService } from '../../../services/user/user.service';
import { BookingService } from '../../../services/booking/booking.service';
import { AddBookingTourRequest } from '../../../models/request/booking/add-booking-tour-request';
import { GetTourScheduleResponse } from '../../../models/response/product/tour/tour-schedule/get-tour-schedule-response';
import { TourScheduleService } from '../../../services/product/tour/tour-schedule/tour-schedule.service';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NotificationComponent } from '../../notification/notification.component';

@Component({
  selector: 'app-location-detail',
  standalone: true,
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    UserService
  ],
  imports: [CommonModule, HttpClientModule, FormsModule,NotificationComponent],
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.css']
})
export class LocationDetailComponent {
  @Input() location: string | null = null;
  isExpanded = false;
  locationId: string | null = null;
  locations?: GetTourResponse;
  getTourScheduleResponse: GetTourScheduleResponse[] = [];
  availableTourSchedules: GetTourScheduleResponse[] = [];
  selectedTourSchedule: number | null = null;
  selectedPrice: number | null = null;

  @ViewChild(NotificationComponent) notificationComponent!: NotificationComponent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tourService: TourService,
    private bookingService: BookingService,
    private tourScheduleService: TourScheduleService,
    private titleService: Title,
  ) { this.titleService.setTitle("Location-detail"); }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.locationId = params.get('id');
      if (this.locationId) {
        this.getTourDetail(parseInt(this.locationId));
      }
    });
  }

  getTourDetail(id: number) {
    this.tourService.getTourDetailById(id).subscribe({
      next: (response) => {
        if (response) {
          this.locations = response;
          if (this.locations.id !== undefined && this.locations.id !== null) {
            this.getTourScheduleByidTour(this.locations.id);
          }
        } else {
        }
      },
      error: (error) => {
        console.log("Error:", error);
      }
    });
  }

  getTourScheduleByidTour(id: number) {
    this.tourScheduleService.getTourScheduleByidTour(id).subscribe({
      next: (response) => {
        const currentDate = new Date();
        if (response) {
          this.getTourScheduleResponse = response
          .filter(ticket => {
            const startDate = new Date(ticket.timeStartTour || '');
            return startDate >= currentDate; 
          })
          .sort((a, b) => {
            const dateA = new Date(a.timeStartTour || '');
            const dateB = new Date(b.timeStartTour || '');
            return dateA.getTime() - dateB.getTime(); 
          });
          this.getTourScheduleResponse.forEach(schedule => {
            if (schedule.timeStartTour !== undefined) {
              const scheduleDate = new Date(schedule.timeStartTour);
              if (scheduleDate >= currentDate) {
                this.availableTourSchedules.push(schedule);
              }
            }
          }
          );
        }
        this.availableTourSchedules = this.getTourScheduleResponse; 
        if(this.availableTourSchedules.length > 0){
          this.selectedTourSchedule = this.availableTourSchedules[0].id;
          this.onTourScheduleChange();
      }
    }
    });
  }


  onTourScheduleChange() {
    // Lấy ra thông tin chi tiết của lịch trình đã chọn
    const selectedSchedule = this.availableTourSchedules.find(schedule => {
      return schedule.id === Number(this.selectedTourSchedule); // Chuyển selectedTourSchedule thành số
    });

    if (selectedSchedule) {
      this.selectedPrice = selectedSchedule.priceTour ?? null; // Cập nhật giá
    } else {
      this.selectedPrice = null; // Nếu không có lịch trình, đặt giá thành null
    }
  }




  addBookingTour(locationId: string | null) {

    if (!this.selectedTourSchedule) {
      this.notificationComponent.showNotification('error', 'Please select a tour schedule');
      return;
    }

    const id = locationId ? parseInt(locationId) : 0;
    const addBookingTourRequest = new AddBookingTourRequest();
    const idUser = localStorage.getItem('idUser');
    const idBooking = localStorage.getItem('idBooking');
    addBookingTourRequest.idUser = parseInt(idUser!);
    addBookingTourRequest.idTour = id;
    addBookingTourRequest.quantity = 1;

    if(!idUser){
      this.notificationComponent.showNotification('error', 'Vui lòng đăng nhập để thêm vào giỏ hàng');
      setTimeout(() => {
        this.router.navigate(['/auth/login']);
      }, 2000);
      return;
    }

    const selectedSchedule = this.availableTourSchedules.find(schedule => {
      return schedule.id === Number(this.selectedTourSchedule);
    });


    if (selectedSchedule) {
      addBookingTourRequest.totalPrice = selectedSchedule.priceTour;
    } else {
      addBookingTourRequest.totalPrice = 0;
      console.error('Selected tour schedule is null or not found');
      return;
    }

    // Chuyển đổi thành FormData
    const formData = new FormData();
    formData.append('idTour', this.selectedTourSchedule?.toString() || '');
    formData.append('idUser', addBookingTourRequest.idUser.toString());
    formData.append('idBooking', idBooking || '');
    formData.append('quantity', addBookingTourRequest.quantity.toString());
    formData.append('totalPrice', addBookingTourRequest.totalPrice ? addBookingTourRequest.totalPrice.toString() : '');


    this.bookingService.addBookingTour(formData).subscribe({
      next: (response) => {
        if (response) {

          if (idBooking == null) {
            localStorage.setItem('idBooking', response.idBooking + "");
          }
          this.notificationComponent.showNotification('success', 'Thêm vào giỏ hàng thành công');
        }
      },
      error: (error) => {
        console.log("Error:", error);
      }
    });
  }

  toggleContent(event: Event) {
    event.preventDefault();
    this.isExpanded = !this.isExpanded;
  }
}
