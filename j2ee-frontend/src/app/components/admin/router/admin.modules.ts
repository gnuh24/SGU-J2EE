import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  // <-- ReactiveFormsModule thêm vào
import { adminRoutes } from './admin.routes';


import { CityManagementComponent } from '../city/city-management.component';
import { CityUpdateFormComponent } from '../city/city-update-form/city-update-form.component';
import { CityCreateFormComponent } from '../city/city-create-form/city-create-form.component';

import { StationManagementComponent } from '../station/station-management.component';
import { StationUpdateFormComponent } from '../station/station-update-form/station-update-form.component';
import { StationCreateFormComponent } from '../station/station-create-form/station-create-form.component';

import { CoachManagementComponent } from '../coach/coach-management.component';
// import { CoachUpdateFormComponent } from '../coach/coach-update-form/coach-update-form.component';
// import { CoachCreateFormComponent } from '../coach/coach-create-form/coach-create-form.component';


import { AccountManagementComponent } from '../account/account-management.component';
// Angular Material modules
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { ProfileManagementComponent } from '../profile/profile-management.component';

import { InvoiceManagementComponent } from '../invoice/invoice-management.component';
import { InvoiceDetailFormComponent } from '../invoice/invoice-detail-form/invoice-detail-form.component';

import { TicketManagementComponent } from '../ticket-management/ticket-management.component';
import { TicketDetailFormComponent } from '../ticket-management/ticket-detail-form/ticket-detail-form.component';
import { RouteManagementComponent } from '../route-management/route-management.component';
import { RouteUpdateFormComponent } from '../route-management/route-update-form/route-update-form.component';
import { RouteCreateFormComponent } from '../route-management/route-create-form/route-create-form.component';
import { CoachCreateFormComponent } from '../coach/coach-create-form/coach-create-form.component';
import { DashboardSummaryComponent } from '../statistic-management/statistic-management.component';
import { CoachUpdateFormComponent } from '../coach/coach-update-form/coach-update-form.component';
import { ScheduleManagementComponent } from '../schedule-management/schedule-management.component';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
    declarations: [
        CityManagementComponent,
        CityUpdateFormComponent,
        CityCreateFormComponent,

        StationManagementComponent,
        StationUpdateFormComponent,
        StationCreateFormComponent,

        CoachManagementComponent,
        CoachUpdateFormComponent,
        CoachCreateFormComponent,

        RouteManagementComponent,
        RouteUpdateFormComponent,
        RouteCreateFormComponent,
        // RouteDetailFormComponent,  

        ScheduleManagementComponent,
        // ScheduleUpdateFormComponent,  
        // ScheduleCreateFormComponent,  
        // ScheduleDetailFormComponent,  



        InvoiceManagementComponent,
        InvoiceDetailFormComponent,

        TicketManagementComponent,
        TicketDetailFormComponent,

        AccountManagementComponent,
        ProfileManagementComponent,

        DashboardSummaryComponent,

    ],
    imports: [
        CommonModule,
        RouterModule.forChild(adminRoutes),
        FormsModule,
        ReactiveFormsModule,  // <-- Thêm vào imports

        // Material modules
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatOptionModule,
        MatCardModule,
        MatIconModule,
    ],
})
export class AdminModule { }
