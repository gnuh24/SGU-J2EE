import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Thêm FormsModule thay vì ReactiveFormsModule
import { adminRoutes } from './admin.routes';
import { CityManagementComponent } from '../city/city-management.component';  // Đảm bảo import đúng

@NgModule({
  declarations: [
    CityManagementComponent, // Thêm vào danh sách declarations
    // Các component khác trong admin module nếu cần
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(adminRoutes),
    FormsModule,  // Thêm FormsModule vào imports
  ],
})
export class AdminModule {}
