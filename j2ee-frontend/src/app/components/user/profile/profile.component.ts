import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { UserSessionService } from '../../../services/user-session.service';
import { ProfileService } from '../../../services/profile.service';
import { ApiResponse } from '../../../models/apiresponse';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  loading = false;
  error: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private userSession: UserSessionService
  ) {
    this.profileForm = this.fb.group({
      fullName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: [''],
      dateOfBirth: ['']
    });
  }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.loading = true;
    const userId = this.userSession.getUserId();
    if (userId) {
      this.profileService.getProfileById(userId).subscribe({
        next: (response: ApiResponse<any>) => {
          if (response.data) {
            this.profileForm.patchValue({
              fullName: response.data.fullName,
              phone: response.data.phone,
              address: response.data.address,
              dateOfBirth: response.data.dateOfBirth
            });
          }
          this.loading = false;
        },
        error: (error) => {
          this.error = error.error.message || 'Không thể tải thông tin profile';
          this.loading = false;
        }
      });
    }
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.loading = true;
      this.error = null;
      this.successMessage = null;

      const profileData = this.profileForm.value;
      this.profileService.updateProfile(profileData).subscribe({
        next: (response: ApiResponse<any>) => {
          this.successMessage = 'Cập nhật thông tin thành công';
          this.userSession.setUserFullName(profileData.fullName);
          this.loading = false;
        },
        error: (error) => {
          this.error = error.error.message || 'Không thể cập nhật thông tin';
          this.loading = false;
        }
      });
    }
  }
}
