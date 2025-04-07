import { Routes } from '@angular/router';
import { HomeComponent } from './components/user/home/home.component';
import { LocationListComponent } from './components/user/location-list/location-list.component';
import { LocationDetailComponent } from './components/user/location-detail/location-detail.component';
import { BookingComponent } from './components/user/booking/booking.component';
import { PaymentComponent } from './components/user/payment/payment.component';
import { HotelListComponent } from './components/user/hotel-list/hotel-list.component';
import { TicketListComponent } from './components/user/ticket-list/ticket-list.component';
import { TicketDetailComponent } from './components/user/ticket-detail/ticket-detail.component';
import { HotelDetailComponent } from './components/user/hotel-detail/hotel-detail.component';
import { CartComponent } from './components/user/cart/cart.component';
import { HistoryComponent } from './components/user/history/history.component';
import { SearchComponent } from './components/user/search/search.component';
import { LoginComponent } from './components/user/login/login.component';
// import { AuthGuard } from './guards/auth.guard'; // Giả sử bạn đã tạo AuthGuard

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'location-list/:location', component: LocationListComponent },
  { path: 'ticket-list/:location', component: TicketListComponent },
  { path: 'hotel-list/:location', component: HotelListComponent },
  { path: 'lich-trinh', component: TicketListComponent },
  { path: 'tra-cuu-ve', component: HomeComponent }, // Xem xét tạo component riêng nếu cần
  { path: 'login', component: LoginComponent },
  { path: 'location-details/:id', component: LocationDetailComponent },
  { path: 'ticket-details/:id', component: TicketDetailComponent },
  { path: 'hotel-details/:id', component: HotelDetailComponent },
  {
    path: 'admin',
    loadChildren: () =>
      import('./components/admin/router/admin.modules').then(
        (m) => m.AdminModule
      ),
  },
  {
    path: 'booking',
    component: BookingComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'payment',
    component: PaymentComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'cart',
    component: CartComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'order-history',
    component: HistoryComponent,
    // canActivate: [AuthGuard],
  },
  { path: 'search', component: SearchComponent },
  { path: '**', redirectTo: '/home' },
];
