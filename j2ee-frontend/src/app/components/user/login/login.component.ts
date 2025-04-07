import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common'; // ✅ Import CommonModule để dùng *ngIf

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, ReactiveFormsModule], // ✅ Thêm CommonModule vào imports
})
export class LoginComponent {
  authForm: FormGroup;
  isLoginMode = true;

  constructor(private fb: FormBuilder) {
    this.authForm = this.fb.group({
      fullName: [''],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10}$')],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.authForm.valid) {
      console.log(
        this.isLoginMode ? 'Đăng nhập' : 'Đăng ký',
        this.authForm.value
      );
    }
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }
}
