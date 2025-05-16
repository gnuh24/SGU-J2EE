import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
@Component({
    selector: 'app-forget-password',
    standalone: true,
    templateUrl: './forget-password.component.html',
    styleUrls: ['./forget-password.component.scss'],
    imports: [CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule]
})
export class ForgetPasswordComponent {
    forgetForm: FormGroup;
    submitted = false;
    errorMessage = '';
    successMessage = '';

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private http: HttpClient
    ) {
        this.forgetForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }

    onSubmit() {
        if (this.forgetForm.invalid) return;

        this.submitted = true;
        const email = this.forgetForm.get('email')?.value;

        this.http.post(`http://localhost:8080/api/auth/send-otp-reset-password/${email}`, {}).subscribe({
            next: () => {
                Swal.fire({
                    icon: 'success',
                    title: 'Thành công',
                    text: 'Mã OTP đã được gửi đến email.',
                }).then(() => {
                    // Sau khi người dùng nhấn OK, chuyển hướng sang verify-password
                    this.router.navigate(['/verify-password']);
                });
            },
            error: (error) => {
                console.error('Lỗi gửi OTP:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: error.error?.message || 'Không thể gửi mã OTP. Vui lòng thử lại.',
                });
                this.submitted = false;
            }
        });
    }


}
