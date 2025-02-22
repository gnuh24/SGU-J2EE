import { TourService } from './../../../../services/product/tour/tour/tour.service';
import { CreateTourRequest } from './../../../../models/request/product/tour/tour/create-tour-request';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GetTourResponse } from '../../../../models/response/product/tour/tour/get-tour-response';
import { CreateTourResponse } from '../../../../models/response/product/tour/tour/create-tour-response';
import { NoDataFoundComponent } from "../../no-data-found/no-data-found.component";
import { UpdateTourRequest } from '../../../../models/request/product/tour/tour/update-tour-request';
import { UpdateTourResponse } from '../../../../models/response/product/tour/tour/update-tour-response';

@Component({
  selector: 'app-tour',
  standalone: true,
  imports: [CommonModule, FormsModule, NoDataFoundComponent],
  templateUrl: './tour.component.html',
  styleUrl: './tour.component.css'
})
export class TourComponent implements OnInit{
  createTourRequest: CreateTourRequest = new CreateTourRequest();
  createTourResponse: CreateTourResponse = new CreateTourResponse();
  updateTourRequest: UpdateTourRequest = new UpdateTourRequest();
  updateTourResponse: UpdateTourResponse = new UpdateTourResponse();


  imageUrl: string = 'assets/img/DEFAULT/tour-default.png';
  getALlTour: GetTourResponse[] = [];
  filterTour: GetTourResponse[] = [];

  selectedImage: string = 'assets/img/DEFAULT/tour-default.png';
  isDisplayUpdate: boolean = false;
  isDisplayCreate: boolean = false;
  tour?: GetTourResponse;
  currentPage: number = 1;
  pageSize: number = 5;
  pagedData: any[] = [];
  imageId?: string;
  imageFile!: File;
  imageUri?: string = 'assets/img/DEFAULT/tour-default.png';

  searchQuery: string='';

  constructor(private tourService:TourService){}

  ngOnInit(): void {
    this.getAllTour();
    this.updatePagedData();
    console.log(this.selectedImage);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePagedData();
  }

  updatePagedData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedData = this.filterTour.slice(startIndex, endIndex);
  }
  

  get totalPages(): number {
    return Math.ceil(this.filterTour.length / this.pageSize);
  }

  get pages(): number[] {
    return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }

  displayFormCreate(){
    this.isDisplayCreate = true;
  }

  closeFormCreate(){
    this.isDisplayCreate = false;
  }

  displayFromUpdate(tour: GetTourResponse){
    this.updateTourRequest = {
      id: tour.id,
      name: tour.name,
      description: tour.description,
      startLocation: tour.startLocation,
      endLocation: tour.endLocation,
      isActive: tour.isActive,
    };
    this.imageUri = tour.image;
    this.isDisplayUpdate = true;
  }

  closeFormUpdate(){
    this.imageUri = 'assets/img/DEFAULT/tour-default.png';
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

  createFileFromUrl(url: string, fileName: string): Promise<File> {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.blob(); // Chuyển đổi phản hồi thành blob
        })
        .then(blob => {
            return new File([blob], fileName, { type: blob.type }); // Tạo đối tượng File từ blob
        });
  }

  searchTour() {
    console.log('Search Query:', this.searchQuery);
    if (this.searchQuery.trim() != '') {
      this.filterTour = this.getALlTour.filter(hotel =>
        hotel.name?.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
  
      console.log(this.filterTour);
      
      this.currentPage = 1;
      
      this.updatePagedData();
    }
  }

  reset(){
    this.filterTour = this.getALlTour;
    this.updatePagedData();
  }



  //On Submit
  onCreate() {
    console.log(this.createTourRequest);
    if (!this.createTourRequest?.name || !this.createTourRequest?.startLocation || !this.createTourRequest?.description) {
      alert('Please fill in all required fields: Name, Location, Description');
      return;
    }

    if(this.createTourRequest.isActive == undefined ){
      this.createTourRequest.isActive = false;
    }
  
    const formData = new FormData();
    formData.append('name', this.createTourRequest.name || '');
    formData.append('description', this.createTourRequest.description || '');
    formData.append('startLocation', this.createTourRequest.startLocation || '');
    formData.append('isActive', this.createTourRequest.isActive ? 'true' : 'false');
  
    if (this.imageFile != undefined) {
      formData.append('image', this.imageFile);
    }else{
      this.createFileFromUrl(this.selectedImage, 'tour-default.png').then(file => {
        this.imageFile = file; 
        formData.append('image', this.imageFile);
      }).catch(error => {
        console.error('Error creating file from URL:', error);
      });
    }

    console.log(this.createTourRequest);
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
  
    this.tourService.createTour(formData).subscribe({
      next: (data) => {
        this.createTourResponse = data;
        if (this.createTourResponse) {
          console.log('Tour created successfully:', this.createTourResponse);
          alert('Tour created successfully');
          window.location.reload();
        }
      },
      error: (err) => {
        console.error('Error creating tour:', err.message);
      }
    });
  }

  onUpdate(){
    console.log(this.updateTourRequest);
    if(!this.updateTourRequest?.id){
      alert('Not Found Tour Update');
      return;
    }
    if (!this.updateTourRequest?.name || !this.updateTourRequest?.startLocation || !this.updateTourRequest?.description) {
      alert('Please fill in all required fields: Name, Location, Description');
      return;
    }

    if(this.updateTourRequest.isActive == undefined ){
      this.updateTourRequest.isActive = false;
    }
  
    const formData = new FormData();
    formData.append('id', this.updateTourRequest.id.toString() || '');
    formData.append('name', this.updateTourRequest.name || '');
    formData.append('description', this.updateTourRequest.description || '');
    formData.append('startLocation', this.updateTourRequest.startLocation || '');
    formData.append('isActive', this.updateTourRequest.isActive ? 'true' : 'false');
  
    if (this.imageFile != undefined) {
      formData.append('image', this.imageFile);
    }

    console.log(this.updateTourRequest);
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    this.tourService.updateTour(formData).subscribe({
      next: (data) => {
        this.updateTourRequest = data;
        if (this.updateTourRequest) {
          console.log('Tour created successfully:', this.updateTourRequest);
          alert('Tour created successfully');
          window.location.reload();
        }
      },
      error: (err) => {
        console.error('Error creating tour:', err.message);
      }
    });    
  }

  //Get all Tour
  getAllTour(){
    this.tourService.getAllTour().subscribe({
      next: (data) => {
        this.getALlTour = data;
        this.filterTour = this.getALlTour;
        this.updatePagedData();
      },
      error: (err) => {
        console.error('Error getting tours:', err.message);
      }
    })
  }




}
