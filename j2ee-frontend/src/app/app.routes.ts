import { Routes } from '@angular/router';
import { LocationListComponent } from './components/user/location-list/location-list.component';
import { NavbarComponent } from './components/user/navbar/navbar.component';
import { LoginComponent } from './components/auth/login/login.component';
import { LocationDetailComponent } from './components/user/location-detail/location-detail.component';
import { BookingComponent } from './components/user/booking/booking.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { PaymentComponent } from './components/user/payment/payment.component';
import { HomeComponent } from './components/user/home/home.component';
import { HotelListComponent } from './components/user/hotel-list/hotel-list.component';
import { TicketListComponent } from './components/user/ticket-list/ticket-list.component';
import { TicketDetailComponent } from './components/user/ticket-detail/ticket-detail.component';
import { HotelDetailComponent } from './components/user/hotel-detail/hotel-detail.component';
import { CartComponent } from './components/user/cart/cart.component';
import { HistoryComponent } from './components/user/history/history.component';
import { SearchComponent } from './components/user/search/search.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'location-list/:location',
    component: LocationListComponent
  },
  {
    path: 'ticket-list/:location',
    component: TicketListComponent
  },
  {
    path: 'hotel-list/:location',
    component: HotelListComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'auth',
    children: [
      {
        path: '',
        redirectTo: 'login',  
        pathMatch: 'full'    
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      }
    ]
  },
  {
    path: 'location-detail',
    component: LocationDetailComponent
  },
  { path: 'location-details/:id',
    component: LocationDetailComponent 
  },
  { path: 'ticket-details/:id',
    component: TicketDetailComponent
  },
  { path: 'hotel-details/:id',
    component: HotelDetailComponent
  },
  {
    path: 'admin',
    loadChildren: () => import('./components/admin/router/admin.modules').then(m => m.AdminModule)
  },
  {
    path: 'booking',
    component: BookingComponent
  },
  {
    path: 'payment',
    component: PaymentComponent

  },
  {
    path: 'navbar',
    component: NavbarComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'order-history',
    component: HistoryComponent
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: '**',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  }
 
];
