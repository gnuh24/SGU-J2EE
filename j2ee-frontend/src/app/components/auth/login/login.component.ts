import { CommonModule, JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { BookingService } from '../../../services/booking/booking.service';
import { GoogleLoginProvider, GoogleSigninButtonModule, SocialAuthService, SocialLoginModule, SocialUser } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule, JsonPipe,SocialLoginModule,GoogleSigninButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;
  user?: SocialUser;
  loggerIn: boolean = false;

  constructor(private fb: FormBuilder,
    private router: Router,
    private titleService: Title,
    private userService: UserService,
    private bookingService: BookingService,
    private authService: SocialAuthService
  ) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    this.titleService.setTitle("Login");
  }
  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user; 
      this.loggerIn = (user != null);

    });
  }

  loginUser() {
    if (this.userForm.valid) {
      const formData = new FormData();
      formData.append('email', this.userForm.value.email);
      formData.append('password', this.userForm.value.password);
      this.userService.loginUser(formData).subscribe({
        next: (response) => {
          const token = response.accessToken;
          if (token) {
            localStorage.setItem('token', token);
            this.getCurrentUser();
          }
          this.router.navigate(['/home']).then(() => {
            window.location.reload();
          });
        },
        error: (error) => {
          if(error.status === 404){
            this.userForm.get('email')?.setErrors({emailNotFound: true});
          }
          if(error.status === 500){
            this.userForm.get('password')?.setErrors({invalidCredentials: true});
          }

        }
      });
    }
  }

  getCurrentUser() {
    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('idUser', JSON.stringify(user.id));
        if (user.id != undefined) {
          this.getBooking(user.id);
        }
      },
      error: (error) => {
        console.error('Error fetching current user:', error);
      }
    });
  }

  getBooking(idUser: number) {
    this.bookingService.getBookingByUser(idUser).subscribe({
      next: (data) => {
        localStorage.setItem('idBooking', JSON.stringify(data.id));
      }
    })
  }

  signInWithGoogle(): void {
    console.log('Sign in with Google');
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((user) => {
      console.log(user);
    }).catch((err) => {
      console.error('Login failed:', err);
    });
  }

}
