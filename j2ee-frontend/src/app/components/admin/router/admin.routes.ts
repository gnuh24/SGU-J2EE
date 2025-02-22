import { Routes } from "@angular/router";
import { LayoutComponent } from "../layout/layout.component";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { TourComponent } from "../tour-manager/tour/tour.component";
import { TourScheduleComponent } from "../tour-manager/tour-schedule/tour-schedule.component";
import { TourStatisticsComponent } from "../tour-manager/tour-statistics/tour-statistics.component";
import { TourismComponent } from "../tourism-manager/tourism/tourism.component";
import { TicketComponent } from "../tourism-manager/ticket/ticket.component";
import { TourismStatisticsComponent } from "../tourism-manager/tourism-statistics/tourism-statistics.component";
import { HotelComponent } from "../hotel-manager/hotel/hotel.component";
import { HotelBookingComponent } from "../hotel-manager/hotel-booking/hotel-booking.component";
import { HotelStatisticsComponent } from "../hotel-manager/hotel-statistics/hotel-statistics.component";
import { PromotionComponent } from "../promotion-manager/promotion/promotion.component";
import { VoucherComponent } from "../promotion-manager/voucher/voucher.component";
import { StatisticsComponent } from "../statistics/statistics.component";
import { PageHomeComponent } from "../page/page-home/page-home.component";
import { BookingPendingComponent } from "../booking/booking-pending/booking-pending.component";
import { BookingAcceptComponent } from "../booking/booking-accept/booking-accept.component";
import { BookingCancelComponent } from "../booking/booking-cancel/booking-cancel.component";

export const adminRoutes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children:[
            {
                path: 'tour-manager',
                children: [
                    {
                        path: 'tour',
                        component: TourComponent
                    },
                    {
                        path: 'tour-schedule',
                        component: TourScheduleComponent
                    },
                    {
                        path: 'tour-statistics',
                        component: TourStatisticsComponent
                    }
                ]
            },
            {
                path: 'tourism-manager',
                children:[
                    {
                        path: 'tourism',
                        component: TourismComponent
                    },
                    {
                        path: 'ticket',
                        component: TicketComponent
                    },
                    {
                        path: 'tourism-statistics',
                        component: TourismStatisticsComponent
                    }
                ]
            },
            {
                path: 'hotel-manager',
                children:[
                    {
                        path: 'hotel',
                        component: HotelComponent
                    },
                    {
                        path: 'hotel-booking',
                        component: HotelBookingComponent
                    },
                    {
                        path: 'hotel-statistics',
                        component: HotelStatisticsComponent
                    }
                ]
            },
            {
                path: 'promotion-manager',
                children:[
                    {
                        path: 'promotion',
                        component: PromotionComponent
                    },
                    {
                        path: 'voucher',
                        component: VoucherComponent
                    }
                ]
            },
            {
                path: 'statistics',
                component: StatisticsComponent
            },
            {
                path: 'page-manager',
                children: [
                    {
                        path: 'home',
                        component: PageHomeComponent
                    }
                ]
            },
            {
                path: 'booking',
                children: [
                    {
                        path: 'pending',
                        component: BookingPendingComponent
                    },
                    {
                        path: 'accept',
                        component: BookingAcceptComponent
                    },
                    {
                        path: 'cancel',
                        component: BookingCancelComponent
                    }
                ]
            }
        ]
    }
]