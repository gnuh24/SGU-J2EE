import { Routes } from '@angular/router';
import { HomeComponent } from './components/user/home/home.component';
import { TripSearchComponent } from './components/user/trip-search/trip-search.component';
import { TicketLookupComponent } from './components/user/ticket-lookup/ticket-lookup.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { PaymentComponent } from './components/user/payment/payment.component';
import { TripDetailComponent } from './components/user/trip-detail/trip-detail.component';
import { LoginComponent } from './components/user/login/login.component';
import { SignupComponent } from './components/user/signup/signup.component';
import { ForgetPasswordComponent } from './components/user/forget-password/forget-password.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'lich-trinh', component: TripSearchComponent },
  { path: 'tra-cuu-ve', component: TicketLookupComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'trip-detail/:id', component: TripDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];
