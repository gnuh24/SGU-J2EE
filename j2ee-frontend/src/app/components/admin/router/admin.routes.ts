import { Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';  // Import LayoutComponent
import { CityManagementComponent } from '../city/city-management.component';  // Import CityManagementComponent
import { StationManagementComponent } from '../station/station-management.component';  // Import CityManagementComponent
import { CoachManagementComponent } from '../coach/coach-management.component';  // Import CityManagementComponent
import { AccountManagementComponent } from '../account/account-management.component';  // Import CityManagementComponent
import { ProfileManagementComponent } from '../profile/profile-management.component';  // Import CityManagementComponent

import { InvoiceManagementComponent } from '../invoice/invoice-management.component';  // Import CityManagementComponent
import { TicketManagementComponent } from '../ticket-management/ticket-management.component';

import { RouteManagementComponent } from '../route-management/route-management.component';  // Import CityManagementComponent
import { ScheduleManagementComponent } from '../schedule-management/schedule-management.component';  // Import CityManagementComponent

import { DashboardSummaryComponent } from '../statistic-management/statistic-management.component';  // Import CityManagementComponent
export const adminRoutes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'dashboard',
                children: [
                    { path: "", component: DashboardSummaryComponent }
                ]
            },
            {
                path: 'system',
                children: [
                    { path: 'city', component: CityManagementComponent },  // Thêm route cho CityManagementComponent
                    { path: 'station', component: StationManagementComponent },  // Thêm route cho CityManagementComponent
                    { path: 'coach', component: CoachManagementComponent }  // Thêm route cho CityManagementComponent

                ]
            },


            {
                path: 'trip',
                children: [
                    { path: 'route', component: RouteManagementComponent },  // Thêm route cho CityManagementComponent
                    { path: 'schedule', component: ScheduleManagementComponent },  // Thêm route cho CityManagementComponent

                ]
            },


            // Các route khác
            {
                path: 'user',
                children: [
                    { path: 'account', component: AccountManagementComponent },
                    { path: 'profile', component: ProfileManagementComponent },

                ]
            },


            // Các route khác
            {
                path: 'booking',
                children: [
                    { path: 'invoice', component: InvoiceManagementComponent },
                    { path: 'ticket', component: TicketManagementComponent },

                ]
            },
        ]
    }
];
