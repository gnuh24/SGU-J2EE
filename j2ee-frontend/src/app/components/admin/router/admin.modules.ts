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

@NgModule({
  declarations: [
    CityManagementComponent,
    CityUpdateFormComponent,  // <-- Thêm vào declarations
    CityCreateFormComponent,  // <-- Thêm vào declarations

    StationManagementComponent,
    StationUpdateFormComponent,  // <-- Thêm vào declarations
    StationCreateFormComponent,  // <-- Thêm vào declarations

    AccountManagementComponent,

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
