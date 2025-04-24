import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Thêm FormsModule thay vì ReactiveFormsModule
import { adminRoutes } from './admin.routes';
import { CityManagementComponent } from '../city/city-management.component';  // Đảm bảo import đúng

// Các module của Angular Material bạn muốn sử dụng
import { MatTableModule } from '@angular/material/table';  // Bảng dữ liệu
import { MatPaginatorModule } from '@angular/material/paginator';  // Phân trang
import { MatSortModule } from '@angular/material/sort';  // Sắp xếp
import { MatButtonModule } from '@angular/material/button';  // Nút
import { MatInputModule } from '@angular/material/input';  // Input
import { MatFormFieldModule } from '@angular/material/form-field';  // Form Field
import { MatSelectModule } from '@angular/material/select';  // Dùng cho mat-option
import { MatOptionModule } from '@angular/material/core';  // Dùng cho mat-option

@NgModule({
  declarations: [
    CityManagementComponent, // Thêm vào danh sách declarations
    // Các component khác trong admin module nếu cần
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(adminRoutes),
    FormsModule,  // Thêm FormsModule vào imports

    // Các module của Angular Material
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,  // Form field
    MatSelectModule,  // Dùng cho mat-option
    MatOptionModule,  // Dùng cho mat-option
  ],
})
export class AdminModule {}
