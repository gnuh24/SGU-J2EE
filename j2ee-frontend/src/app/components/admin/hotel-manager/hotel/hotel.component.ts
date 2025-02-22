import { HotelService } from './../../../../services/product/hotel/hotel/hotel.service';
import { Component } from '@angular/core';
import { GetHotelResponse } from '../../../../models/response/product/hotel/hotel/get-hotel-response';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateHotelRequest } from '../../../../models/request/product/hotel/hotel/create-hotel-request';
import { CreateHotelResponse } from '../../../../models/response/product/hotel/hotel/create-hotel-response';
import { NoDataFoundComponent } from "../../no-data-found/no-data-found.component";
import { UpdateHotelRequest } from '../../../../models/request/product/hotel/hotel/update-hotel-request';
import { UpdateHotelResponse } from '../../../../models/response/product/hotel/hotel/update-hotel-response';

@Component({
  selector: 'app-hotel',
  standalone: true,
  imports: [CommonModule, FormsModule, NoDataFoundComponent],
  templateUrl: './hotel.component.html',
  styleUrl: './hotel.component.css'
})
export class HotelComponent {
  createHotelRequest: CreateHotelRequest = new CreateHotelRequest();
  createHotelResponse: CreateHotelResponse = new CreateHotelResponse();
  updateHotelRequest: UpdateHotelRequest = new UpdateHotelRequest();
  updateHotelResponse: UpdateHotelResponse = new UpdateHotelResponse();
  getAllHotelReponse: GetHotelResponse[] = [];
  filterHotelResponse: GetHotelResponse[] = [];

  imageUrl: string = 'assets/img/DEFAULT/hotel-default.png';
  selectedImage: string = 'assets/img/DEFAULT/hotel-default.png';

  isDisplayCreate = false;
  isDisplayUpdate = false;

  imageFile?: File;
  imageUri?: string;

  hotel?: GetHotelResponse;
  currentPage: number = 1;
  pageSize: number = 5;
  pagedData: any[] = [];

  searchQuery: string='';

  constructor(private hotelService: HotelService){}

  ngOnInit(): void {
    this.getAllHotel();
    this.updatePagedData();
    console.log(this.pagedData);
    console.log(this.selectedImage);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePagedData();
  }

  updatePagedData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedData = this.filterHotelResponse.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.filterHotelResponse.length / this.pageSize);
  }

  get pages(): number[] {
    return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }

  searchTour() {
    console.log('Search Query:', this.searchQuery);
    if (this.searchQuery.trim() != '') {
      this.filterHotelResponse = this.getAllHotelReponse.filter(hotel =>
        hotel.name?.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
  
      console.log(this.filterHotelResponse);
      
      this.currentPage = 1;
      
      this.updatePagedData();
    }
  }
  
  reset(){
    this.filterHotelResponse = this.getAllHotelReponse;
    this.currentPage = 1;  // Đặt lại trang hiện tại về trang đầu tiên
    this.updatePagedData();
  }
  

  displayFormCreate(){
    this.isDisplayCreate = true;
  }

  closeFormCreate(){
    this.isDisplayCreate = false;
  }

  displayFormUpdate(hotel: GetHotelResponse){
    this.updateHotelRequest = {
      id: hotel.id,
      name: hotel.name,
      contactInfo: hotel.contactInfo,
      pricePerNight: hotel.pricePerNight,
      location: hotel.location,
      isActive: hotel.active,
      rating: hotel.rating, 
    };
    this.imageUri = hotel.image;
    this.isDisplayUpdate = true;
  }

  closeFormUpdate(){
    this.isDisplayUpdate = false;
  }

  onImageSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.imageFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUri = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }


  getAllHotel(){
    this.hotelService.getAllHotel().subscribe({
        next: (data) =>{
          this.getAllHotelReponse = data;
          this.filterHotelResponse = this.getAllHotelReponse;
          this.updatePagedData();
          console.log('All tours:', this.getAllHotelReponse);
      },
      error: (err) => {
        console.error('Error getting tours:', err.message);
      }
    }
    )
  }

  onCreate(){
    if(!this.createHotelRequest?.name || !this.createHotelRequest?.contactInfo || !this.createHotelRequest?.pricePerNight || !this.createHotelRequest?.location){
      alert('Please fill in all required fields: Name, ContacInfo, PricePerNight, Location');
      return;
    }
    if(this.createHotelRequest.isActive == undefined){
      this.createHotelRequest.isActive = false;
    }

    const formData = new FormData();
    formData.append('name', this.createHotelRequest.name || '');
    formData.append('contactInfo', this.createHotelRequest.contactInfo || '');
    formData.append('pricePerNight', this.createHotelRequest.pricePerNight?.toString() || '');
    formData.append('location', this.createHotelRequest.location || '');
    formData.append('isActive', this.createHotelRequest.isActive ? 'true' : 'false');
    formData.append('rating', this.createHotelRequest.rating?.toString() || '');

    if (this.imageFile != undefined) {
      formData.append('image', this.imageFile);
    }

    this.hotelService.createHotel(formData).subscribe({
      next: (data) => {
        this.createHotelResponse = data;
        if(this.createHotelResponse){
          console.log('Tour created successfully:', this.createHotelResponse);
          alert('Hotel created successfully');
          window.location.reload();
        }
      },
      error: (err) => {
        console.error('Error creating tour:', err.message);
        alert(`Error creating tour: ${err.message}`);
      }
    });
  }

  onUpdate(){
    if(!this.updateHotelRequest?.id){
      alert('Hotel Not Found Update. Please Create!');
      return;
    }
    if(!this.updateHotelRequest?.name || !this.updateHotelRequest?.contactInfo || !this.updateHotelRequest?.pricePerNight || !this.updateHotelRequest?.location){
      alert('Please fill in all required fields: Name, ContacInfo, PricePerNight, Location');
      return;
    }
    if(this.updateHotelRequest.isActive == undefined){
      this.updateHotelRequest.isActive = false;
    }

    const formData = new FormData();
    formData.append('id', this.updateHotelRequest.id.toString() || '');
    formData.append('name', this.updateHotelRequest.name || '');
    formData.append('contactInfo', this.updateHotelRequest.contactInfo || '');
    formData.append('pricePerNight', this.updateHotelRequest.pricePerNight?.toString() || '');
    formData.append('location', this.updateHotelRequest.location || '');
    formData.append('isActive', this.updateHotelRequest.isActive ? 'true' : 'false');
    formData.append('rating', this.updateHotelRequest.rating?.toString() || '');

    if (this.imageFile != undefined) {
      formData.append('image', this.imageFile);
    }

    console.log(this.updateHotelRequest);
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });


    this.hotelService.updateHotel(formData).subscribe({
      next: (data) => {
        this.updateHotelResponse = data;
        if(this.updateHotelResponse){
          console.log('Tour created successfully:', this.updateHotelResponse);
          alert('Hotel created successfully');
          window.location.reload();
        }
      },
      error: (err) => {
        console.error('Error creating tour:', err.message);
        alert(`Error creating tour: ${err.message}`);
      }
    });
  }

}
