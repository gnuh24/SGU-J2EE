import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class ForgetPasswordComponent {
  forgetForm: FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder, private router: Router) {
    this.forgetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }
  onSubmit() {
    if (this.forgetForm.valid) {
      this.submitted = true;
      // TODO: call API quên mật khẩu
    }
  }
} 