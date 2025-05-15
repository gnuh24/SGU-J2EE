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
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { AuthResponseDTO } from '../../../models/auth.model';
import { UserSessionService } from '../../../services/user-session.service';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    FormsModule, 
    RouterModule,
    HttpClientModule
  ]
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoginMode = true;
  errorMessage: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private userSession: UserSessionService
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
        next: (response: AuthResponseDTO) => {
          this.router.navigate(['/home']);
        },
        error: (error: any) => {
          this.errorMessage = error.error.message || 'Đăng nhập thất bại';
        }
      });
    }
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }
}
