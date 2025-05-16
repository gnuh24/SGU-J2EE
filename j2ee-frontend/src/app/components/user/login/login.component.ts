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
import { ApiResponse } from '../../../models/apiresponse';
import { UserData } from '../../../models/user.model';
import { UserSessionService } from '../../../services/user-session.service';
import Swal from 'sweetalert2';
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
    errorMessage: string | null = null;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthService,
        private userSession: UserSessionService
    ) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(1)]]
        });
    }

    onSubmit() {
        if (this.loginForm.valid) {
            const { email, password } = this.loginForm.value;
            this.authService.login(email, password).subscribe(
                (response: ApiResponse<UserData>) => {
                    // Đăng nhập thành công, user đã được lưu vào sessionStorage
                    this.router.navigate(['/']);
                },
                (error) => {
                    console.error('Đăng nhập thất bại:', error);
                    const errorMsg = error.error?.message || 'Đăng nhập thất bại';
                    Swal.fire({
                        icon: 'error',
                        title: 'Lỗi',
                        text: errorMsg,
                        confirmButtonText: 'Đóng'
                    });
                }
            );
        }
    }

    toggleMode() {
        this.isLoginMode = !this.isLoginMode;
    }
}
