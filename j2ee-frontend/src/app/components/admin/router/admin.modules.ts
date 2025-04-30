import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  // <-- ReactiveFormsModule thêm vào
import { adminRoutes } from './admin.routes';


import { CityManagementComponent } from '../city/city-management.component';
import { CityUpdateFormComponent } from '../city/city-update-form/city-update-form.component'; // <-- Import component
import { CityCreateFormComponent } from '../city/city-create-form/city-create-form.component'; // <-- Import component

import { StationManagementComponent } from '../station/station-management.component';
import { StationUpdateFormComponent } from '../station/station-update-form/station-update-form.component'; // <-- Import component
import { StationCreateFormComponent } from '../station/station-create-form/station-create-form.component'; // <-- Import component

import { CoachManagementComponent } from '../coach/coach-management.component';
// import { CoachUpdateFormComponent } from '../coach/coach-update-form/coach-update-form.component'; // <-- Import component
// import { CoachCreateFormComponent } from '../coach/coach-create-form/coach-create-form.component'; // <-- Import component


import { AccountManagementComponent } from '../account/account-management.component'; // <-- Import component
// Angular Material modules
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { ProfileManagementComponent } from '../profile/profile-management.component'; // <-- Import component

import { InvoiceManagementComponent } from '../invoice/invoice-management.component'; // <-- Import component
import { InvoiceDetailFormComponent } from '../invoice/invoice-detail-form/invoice-detail-form.component'; // <-- Import component

import { TicketManagementComponent } from '../ticket-management/ticket-management.component';
import { TicketDetailFormComponent } from '../ticket-management/ticket-detail-form/ticket-detail-form.component'; // <-- Import component
import { RouteManagementComponent } from '../route-management/route-management.component';
// import { RouteUpdateFormComponent } from '../route-management/route-update-form/route-update-form.component'; // <-- Import component
// import { RouteCreateFormComponent } from '../route-management/route-create-form/route-create-form.component'; // <-- Import component


import { ScheduleManagementComponent } from '../schedule-management/schedule-management.component';
@NgModule({
  declarations: [
    CityManagementComponent,
    CityUpdateFormComponent,  // <-- Thêm vào declarations
    CityCreateFormComponent,  // <-- Thêm vào declarations

    StationManagementComponent,
    StationUpdateFormComponent,  // <-- Thêm vào declarations
    StationCreateFormComponent,  // <-- Thêm vào declarations

    CoachManagementComponent,
    // CoachUpdateFormComponent,  // <-- Thêm vào declarations
    // CoachCreateFormComponent,  // <-- Thêm vào declarations

    RouteManagementComponent,
    // RouteUpdateFormComponent,  // <-- Thêm vào declarations
    // RouteCreateFormComponent,  // <-- Thêm vào declarations
    // RouteDetailFormComponent,  // <-- Thêm vào declarations

    ScheduleManagementComponent,
    // ScheduleUpdateFormComponent,  // <-- Thêm vào declarations
    // ScheduleCreateFormComponent,  // <-- Thêm vào declarations
    // ScheduleDetailFormComponent,  // <-- Thêm vào declarations



    InvoiceManagementComponent,
    // InvoiceDetailFormComponent,  // <-- Thêm vào declarations

    TicketManagementComponent,
    TicketDetailFormComponent,

    AccountManagementComponent,
    ProfileManagementComponent,

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
  ],
})
export class AdminModule { }
