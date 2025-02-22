import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from "../../../user/navbar/navbar.component";
import { HomeComponent } from "../../../user/home/home.component";
import { GetPageResponse } from '../../../../models/response/home/get-page-response';
import { HomeService } from '../../../../services/home/home.service';
import { CreatePageRequest } from '../../../../models/request/home/create-page-request';

@Component({
  selector: 'app-page-home',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, HomeComponent],
  templateUrl: './page-home.component.html',
  styleUrl: './page-home.component.css'
})
export class PageHomeComponent implements OnInit {
  defaultVideoUrl: string = 'https://hoianmemoriesland.com/public/media/tvc/tvc0808.mp4';

  imageHeaders: File;
  selectedDetailFiles: File[] = []; 

  selectedFile: File | null = null;
  mediaPreviewUrl: string = '';
  isVideo: boolean = false;

  footerImagePreview: string | ArrayBuffer | null = null;
  footerImageFile: File | null = null;

  homeData: GetPageResponse = new GetPageResponse();
  detailData: GetPageResponse[] = [];
  footerData: GetPageResponse = new GetPageResponse();

  // Image preview URLs
  homeImagePreview: string | null = null;
  detailImagePreviews: string[] = [];

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.fetchHomeData();
    this.fetchDetailData();
    this.fetchFooterData();
  }

  // Fetch data for home, details, and footer
  fetchHomeData(): void {
    this.homeService.getHome().subscribe({
      next: (data: GetPageResponse) => {
        this.homeData = data;
        this.isVideo=true;
        this.mediaPreviewUrl = this.homeData.url;
      },
      error: (error) => {
        console.error('Error fetching home data:', error);
      }
    });
  }

  fetchDetailData(): void {
    this.homeService.getDetail().subscribe({
      next: (data) => {
        this.detailData = data;
        this.detailImagePreviews = this.detailData.map(detail => detail.url || '');  // Set initial previews for details
      },
      error: (error) => {
        console.error('Error fetching detail data:', error);
      }
    });
  }

  fetchFooterData(): void {
    this.homeService.getFooter().subscribe({
      next: (data: GetPageResponse) => {
        this.footerData = data;
        this.footerImagePreview = this.footerData.url;  // Set initial image preview for footer
      },
      error: (error) => {
        console.error('Error fetching footer data:', error);
      }
    });
  }

  // Update image preview for home, details, or footer
  updateImagePreview(section: 'home' | 'detail' | 'footer', index?: number): void {
    if (section === 'home') {
      this.homeImagePreview = this.homeData.url || null;
    } else if (section === 'detail' && index !== undefined) {
      this.detailImagePreviews[index] = this.detailData[index].url || '';
    } else if (section === 'footer') {
      this.footerImagePreview = this.footerData.url || null;
    }
  }

  savePage(detail: any): void {
    const formData = new FormData();
    formData.append('id', detail.id.toString() || '');
    formData.append('name', detail.name || '');
    formData.append('description', detail.description || '');

    const index = this.detailData.indexOf(detail);
    
    // Thêm file nếu có, sau đó xóa để giải phóng bộ nhớ
    if (this.selectedDetailFiles[index]) {
      formData.append('file', this.selectedDetailFiles[index]);
    }
    if (this.footerImageFile) {
      formData.append('file', this.footerImageFile);
    }
    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }

    // In ra các giá trị trong formData để debug
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    this.homeService.editPage(formData).subscribe({
      next: (response) => {
        alert('Saved successfully');
        console.log('Detail saved successfully');
        
        // Reset các biến file sau khi lưu thành công
        this.selectedDetailFiles[index] = null; // Hoặc `undefined`
        this.footerImageFile = null;
        this.selectedFile = null;
      },
      error: (err) => {
        console.error('Error saving detail:', err);
      }
    });
}


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const fileType = file.type;

      // Check if the file is a video
      if (!fileType.startsWith('video/')) {
        alert('Please select a video file.');
        this.selectedFile = null; // Clear the selected file
        this.mediaPreviewUrl = this.homeData.url; // Clear the preview
        this.isVideo = true;
        return; // Exit the function if it's not a video
      }

      // If it's a video, proceed with the preview
      this.selectedFile = file;
      this.isVideo = true;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.mediaPreviewUrl = e.target.result; // Set the preview URL
      };
      reader.readAsDataURL(file); // Read the video file and create a preview
    }
  }

  onDetailFileSelected(event: any, index: number): void {
    const file: File = event.target.files[0];
    if (file) {
      // Store the selected file
      this.selectedDetailFiles[index] = file;
      
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // Store the image preview
        this.detailImagePreviews[index] = e.target.result;
      };
      
      reader.readAsDataURL(file); // Read the file to generate a preview
    }
  }

  // Method to handle file input change event
  onFileChange(event: Event, section: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      
      reader.onload = (e: any) => {
        if (section === 'footer') {
          this.footerImagePreview = e.target.result;
          this.footerImageFile = file; // Store the selected file
        }
      };
      
      reader.readAsDataURL(file);
    }
  }

}
