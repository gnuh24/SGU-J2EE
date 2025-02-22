import { GetPromotionResponse } from './../../../../models/response/product/voucher/promotion/get-promotion-response';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GetHotelResponse } from '../../../../models/response/product/hotel/hotel/get-hotel-response';
import { NoDataFoundComponent } from "../../no-data-found/no-data-found.component"; // Giả sử có component này
import { CreatePromotionRequest } from '../../../../models/request/product/voucher/promotion/create-promotion-request';
import { UpdatePromotionRequest } from '../../../../models/request/product/voucher/promotion/update-promotion-request';
import { UpdatePromotionResponse } from '../../../../models/response/product/voucher/promotion/update-promotion-response';
import { CreatePromotionResponse } from '../../../../models/response/product/voucher/promotion/create-promotion-response';
import { PromotionService } from '../../../../services/product/voucher/promotion/promotion.service';

@Component({
  selector: 'app-promotion',
  standalone: true,
  imports: [CommonModule, FormsModule, NoDataFoundComponent],
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent {
  createPromotionRequest: CreatePromotionRequest = new CreatePromotionRequest();
  createPromotionResponse: CreatePromotionResponse = new CreatePromotionResponse();
  updatePromotionRequest: UpdatePromotionRequest = new UpdatePromotionRequest();
  updatePromotionResponse: UpdatePromotionResponse = new UpdatePromotionResponse();
  
  selectedImage: string = 'assets/img/DEFAULT/hotel-default.png';
  isDisplayCreate = false;
  isDisplayUpdate = false;
  getPromotionResponse: GetPromotionResponse[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  filterPromotion: GetPromotionResponse[] = [];
  pagedData: GetPromotionResponse[] = [];
  searchQuery: string='';

  constructor(private promotionService: PromotionService) {}

  ngOnInit(): void {
    this.getAllPromotions();
    this.updatePagedData();
    console.log(this.selectedImage);
  }

  searchTour() {
    console.log('Search Query:', this.searchQuery);
    if (this.searchQuery.trim() != '') {
      this.filterPromotion = this.getPromotionResponse.filter(tour =>
        tour.name?.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      console.log(this.filterPromotion);
      this.updatePagedData();
    }
  }

  reset(){
    this.filterPromotion = this.getPromotionResponse;
    this.updatePagedData();
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePagedData();
  }

  updatePagedData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedData = this.filterPromotion.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.filterPromotion.length / this.pageSize);
  }

  get pages(): number[] {
    return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }

  displayFormCreate() {
    this.isDisplayCreate = true;
  }

  closeFormCreate() {
    this.isDisplayCreate = false;
  }

  displayFormUpdate(promotion: GetPromotionResponse) {
    this.updatePromotionRequest = {
      id: promotion.id,
      name: promotion.name,
      discountRate: promotion.discountRate,
      startDate: promotion.startDate,
      endDate: promotion.endDate,
      description: promotion.description,
    };
    this.isDisplayUpdate = true;
  }

  closeFormUpdate() {
    this.isDisplayUpdate = false;
  }

  getAllPromotions() {
    this.promotionService.getAll().subscribe({
      next: (data) => {
        this.getPromotionResponse = data;
        this.filterPromotion = this.getPromotionResponse;
        this.updatePagedData();
        console.log('All promotions:', this.getPromotionResponse);
      },
      error: (err) => {
        console.error('Error getting promotions:', err.message);
      }
    });
  }

  onCreatePromotion() {
    // Kiểm tra nếu các trường bắt buộc không được điền
    if (!this.createPromotionRequest?.name || 
        !this.createPromotionRequest?.discountRate || 
        !this.createPromotionRequest?.startDate || 
        !this.createPromotionRequest?.endDate) {
      alert('Please fill in all required fields: Name, Discount Rate, Start Date, End Date');
      return;
    }
  
    const formData = new FormData();
    
    formData.append('name', this.createPromotionRequest.name ?? '');
    formData.append('discountRate', this.createPromotionRequest.discountRate?.toString() ?? '');
    formData.append('description', this.createPromotionRequest.description ?? ''); 
    if(this.createPromotionRequest.startDate!=undefined && this.createPromotionRequest.endDate!=undefined ){
      const startDate = new Date(this.createPromotionRequest.startDate);  
      const startDateWithoutTimezone = startDate.toISOString().slice(0, 19);
      const endDate = new Date(this.createPromotionRequest.endDate);  
      const endDateWithoutTimezone = endDate.toISOString().slice(0, 19);
      formData.append('startDate', startDateWithoutTimezone); 
      formData.append('endDate', endDateWithoutTimezone);
    }
  
    this.promotionService.createPromotion(formData).subscribe({
      next: (data) => {
        this.createPromotionResponse = data;
        if (this.createPromotionResponse) {
          console.log('Promotion created successfully:', this.createPromotionResponse);
          alert('Promotion created successfully');
          this.getAllPromotions(); // Làm mới danh sách
          this.closeFormCreate(); // Đóng form sau khi tạo thành công
        }
      },
      error: (err) => {
        console.error('Error creating promotion:', err.message);
        alert(`Error creating promotion: ${err.message}`);
      }
    });
  }
  

  onUpdatePromotion() {
    if (!this.updatePromotionRequest?.id) {
      alert('Promotion Not Found. Please Create!');
      return;
    }

    const formData = new FormData();
    
    formData.append('id', this.updatePromotionRequest.id.toString());
    formData.append('name', this.updatePromotionRequest.name ?? '');
    formData.append('discountRate', this.updatePromotionRequest.discountRate?.toString() ?? '');
    formData.append('description', this.updatePromotionRequest.description ?? ''); 

    if(this.updatePromotionRequest.startDate!=undefined && this.updatePromotionRequest.endDate!=undefined ){
      const startDate = new Date(this.updatePromotionRequest.startDate);  
      const startDateWithoutTimezone = startDate.toISOString().slice(0, 19);
      const endDate = new Date(this.updatePromotionRequest.endDate);  
      const endDateWithoutTimezone = endDate.toISOString().slice(0, 19);
      formData.append('startDate', startDateWithoutTimezone); 
      formData.append('endDate', endDateWithoutTimezone);
    }

    this.promotionService.updatePromotion(formData).subscribe({
      next: (data) => {
        this.updatePromotionResponse = data;
        if (this.updatePromotionResponse) {
          console.log('Promotion updated successfully:', this.updatePromotionResponse);
          alert('Promotion updated successfully');
          this.getAllPromotions(); // Refresh danh sách
          this.closeFormUpdate();
        }
      },
      error: (err) => {
        console.error('Error updating promotion:', err.message);
        alert(`Error updating promotion: ${err.message}`);
      }
    });
  }
}
