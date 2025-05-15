import { Routes } from '@angular/router';
import { HomeComponent } from './components/user/home/home.component';

import { LoginComponent } from './components/user/login/login.component';
import { SignupComponent } from './components/user/signup/signup.component';
import { TripDetailComponent } from './components/user/trip-detail/trip-detail.component';
import { ForgetPasswordComponent } from './components/user/forget-password/forget-password.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { PaymentComponent } from './components/user/payment/payment.component';
import { TicketLookupComponent } from './components/user/ticket-lookup/ticket-lookup.component';
import { TripSearchComponent } from './components/user/trip-search/trip-search.component';

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
  { path: '**', redirectTo: '/home' },
  {
    path: 'admin',
    loadChildren: () =>
      import('./components/admin/router/admin.modules').then(
        (m) => m.AdminModule
      ),
  },
  // {
  //   path: 'booking',
  //   component: BookingComponent,
  //   // canActivate: [AuthGuard],
  // },
  // {
  //   path: 'payment',
  //   component: PaymentComponent,
  //   // canActivate: [AuthGuard],
  // },
  // {
  //   path: 'cart',
  //   component: CartComponent,
  //   // canActivate: [AuthGuard],
  // },
  // {
  //   path: 'order-history',
  //   component: HistoryComponent,
  //   // canActivate: [AuthGuard],
  // },
  // { path: 'search', component: SearchComponent },
  // { path: '**', redirectTo: '/home' },
];
