import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // ✅ Import CommonModule để dùng *ngIf
import { AuthService } from '../../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule] // ✅ Thêm CommonModule vào imports
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoginMode = true;
  errorMessage: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (response) => {
          sessionStorage.setItem('token', response.data.token);
          sessionStorage.setItem('refreshToken', response.data.refreshToken);
          sessionStorage.setItem('userRole', response.data.role);
          sessionStorage.setItem('userEmail', response.data.email);
          sessionStorage.setItem('userId', response.data.id);
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.errorMessage = error.error.message || 'Đăng nhập thất bại';
        }
      });
    }
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }
}
