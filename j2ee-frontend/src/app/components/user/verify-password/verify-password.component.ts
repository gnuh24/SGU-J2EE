import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-verify-password',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule],
    templateUrl: './verify-password.component.html',
    styleUrl: './verify-password.component.scss'
})
export class VerifyPasswordComponent {
    verifyForm: FormGroup;
    submitted = false;

    constructor(
        private fb: FormBuilder,
        private http: HttpClient,
        private router: Router
    ) {
        this.verifyForm = this.fb.group({
            otp: ['', [Validators.required]],
            newPassword: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    onSubmit() {
        if (this.verifyForm.invalid) return;

        this.submitted = true;

        const payload = {
            otp: this.verifyForm.value.otp,
            newPassword: this.verifyForm.value.newPassword
        };

        this.http.patch('http://localhost:8080/api/auth/reset-password', payload).subscribe({
            next: () => {
                Swal.fire({
                    icon: 'success',
                    title: 'Thành công',
                    text: 'Mật khẩu đã được đặt lại. Bạn có thể đăng nhập ngay bây giờ.',
                }).then(() => {
                    this.router.navigate(['/login']);
                });
            },
            error: (error) => {
                console.error('Lỗi đặt lại mật khẩu:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: error.error?.message || 'Không thể đặt lại mật khẩu. Vui lòng thử lại.',
                });
                this.submitted = false;
            }
        });
    }
}
