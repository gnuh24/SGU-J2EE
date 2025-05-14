import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule]
})
export class SignupComponent {
  signupForm: FormGroup;
  successMessage = '';
  errorMessage = '';
  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.signupForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }
  onSubmit() {
    if (this.signupForm.valid) {
      const { email, password, fullName, phone } = this.signupForm.value;
      this.successMessage = '';
      this.errorMessage = '';
      this.authService.register(email, password, fullName, phone).subscribe({
        next: (res) => {
          this.successMessage = res.message || 'Đăng ký thành công! Vui lòng kiểm tra email để kích hoạt tài khoản.';
          this.signupForm.reset();
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Đăng ký thất bại. Vui lòng thử lại.';
        }
      });
    }
  }
} 