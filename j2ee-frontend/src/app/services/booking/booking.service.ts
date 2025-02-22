import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CreateBookingRequest } from '../../models/request/booking/create-booking-request';
import { map, Observable } from 'rxjs';
import { CreateBookingResponse } from '../../models/response/booking/create-booking-response';
import { Apiresponse } from '../../models/response/apiresponse';
import { UpdateBookingRequest } from '../../models/request/booking/update-booking-request';
import { UpdateBookingResponse } from '../../models/response/booking/update-booking-response';
import { GetHotelBookingResponse } from '../../models/response/product/hotel/hotel-booking/get-hotelbooking-response';
import { AddBookingTourRequest } from '../../models/request/booking/add-booking-tour-request';
import { GetBookingResponse } from '../../models/response/booking/get-booking-response';
import { GetBookingDetailResponse } from '../../models/response/booking/get-booking-detail-response';
import { UpdateQuantityTour } from '../../models/response/booking/update-quantity-tour';
import { UpdateQuantityTourism } from '../../models/response/booking/update-quantity-tourism';
import { UpdateQuantityHotel } from '../../models/response/booking/update-quantity-hotel';
import { AddBookingTourResponse } from '../../models/response/booking/add-booking-tour-response';
import { AddBookingTicketResponse } from '../../models/response/booking/add-booking-ticket-response';
import { OrderResponse } from '../../models/response/booking/order-response';
import { isPlatformBrowser } from '@angular/common';
import { UpdateBookingHotelResponse } from '../../models/response/booking/update-hotel-booking-response';
import { environment } from '../environment';
import { GetUserInfoResponse } from '../../models/response/user/user-info/get-user-info-response';
import { GetUserJoinResponse } from '../../models/response/user/user-join/get-user-join-response';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private httpClient:HttpClient, @Inject(PLATFORM_ID) private platformId: Object) { }

  private baseUrl = `${environment.apiBaseUrl}/api/v1/booking`;

  createBooking(createBookingRequest: CreateBookingRequest): Observable<CreateBookingResponse> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.post<Apiresponse<CreateBookingResponse>>(`${this.baseUrl}`, createBookingRequest, {headers}).pipe(
      map((response: Apiresponse<CreateBookingResponse>) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  updateBooking(updateBookingRequest: UpdateBookingRequest): Observable<UpdateBookingResponse>{
    const headers = this.createAuthorizationHeader();
    return this.httpClient.put<Apiresponse<UpdateBookingResponse>>(`${this.baseUrl}`, updateBookingRequest, {headers}).pipe(
      map((response: Apiresponse<UpdateBookingResponse>) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  getBooking(id: number): Observable<GetHotelBookingResponse>{
    const headers = this.createAuthorizationHeader();
    return this.httpClient.get<Apiresponse<GetHotelBookingResponse>>(`${this.baseUrl}?id=${id}`, {headers}).pipe(
      map((response: Apiresponse<GetHotelBookingResponse>) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  getAll(): Observable<GetHotelBookingResponse[]> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.get<Apiresponse<GetHotelBookingResponse[]>>(`${this.baseUrl}/all`, {headers}).pipe(
      map((response: Apiresponse<GetHotelBookingResponse[]>) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  } 
  
  getByType(type: string): Observable<GetHotelBookingResponse[]> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.get<Apiresponse<GetHotelBookingResponse[]>>(`${this.baseUrl}/type?type=${type}`, {headers}).pipe(
      map((response: Apiresponse<GetHotelBookingResponse[]>) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  adminSetTypeBooking(id: number, type: string): Observable<GetBookingResponse>{
    const headers = this.createAuthorizationHeader();
    return this.httpClient.patch<Apiresponse<GetBookingResponse>>(`http://localhost:8080/api/v1/booking/type?type=${type}&id=${id}`, {headers}).pipe(
      map((response: Apiresponse<GetBookingResponse>) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  setBookingType(type: string,id: number): Observable<AddBookingTourResponse>{
    const headers = this.createAuthorizationHeader();
    console.log(headers);
    return this.httpClient.patch<Apiresponse<AddBookingTourResponse>>(`${this.baseUrl}/settype?type=${type}&id=${id}`, null, {headers}).pipe(
      map((response: Apiresponse<AddBookingTourResponse>) => {
        console.log(response);
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  addBookingTour(formData : FormData): Observable<AddBookingTourResponse>{
    const headers = this.createAuthorizationHeader();
    return this.httpClient.post<Apiresponse<AddBookingTourResponse>>(`${this.baseUrl}/tour`,formData, {headers}).pipe(
      map((response: Apiresponse<AddBookingTourResponse>) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  addBookingHotel(formData : FormData): Observable<UpdateBookingHotelResponse>{
    const headers = this.createAuthorizationHeader();
    return this.httpClient.post<Apiresponse<UpdateBookingHotelResponse>>(`${this.baseUrl}/hotel`,formData, {headers}).pipe(
      map((response: Apiresponse<UpdateBookingHotelResponse>) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }
  addBookingTourism(formData : FormData): Observable<AddBookingTicketResponse>{
    const headers = this.createAuthorizationHeader();
    return this.httpClient.post<Apiresponse<AddBookingTicketResponse>>(`${this.baseUrl}/tourism`,formData, {headers}).pipe(
      map((response: Apiresponse<AddBookingTicketResponse>) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  getBookingByUser(id: number): Observable<GetBookingResponse> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.get<Apiresponse<GetBookingResponse>>(`${this.baseUrl}/user?idUser=${id}`, {headers}).pipe(
      map((response: Apiresponse<GetBookingResponse>) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  getHistoryBooking(id:number):  Observable<GetBookingResponse[]> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.get<Apiresponse<GetBookingResponse[]>>(`${this.baseUrl}/history?idUser=${id}`, {headers}).pipe(
      map((response: Apiresponse<GetBookingResponse[]>) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  getDetailBooking(id: number): Observable<GetBookingDetailResponse[]> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.get<Apiresponse<GetBookingDetailResponse[]>>(`${this.baseUrl}/detail?idBooking=${id}`, {headers}).pipe(
      map((response: Apiresponse<GetBookingDetailResponse[]>) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  updateTypeBooking(type: string,id: number): Observable<UpdateBookingResponse> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.patch<Apiresponse<UpdateBookingResponse>>(`${this.baseUrl}/settype?type=${type}&id=${id}`, null, {headers}).pipe(
      map((response: Apiresponse<UpdateBookingResponse>) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  updateQuantityTour(formData : FormData): Observable<UpdateQuantityTour> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.patch<Apiresponse<UpdateQuantityTour>>(`${this.baseUrl}/tour`,formData, {headers}).pipe(
      map((response: Apiresponse<UpdateQuantityTour>) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  updateQuantityTourism(formData : FormData): Observable<UpdateQuantityTourism> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.patch<Apiresponse<UpdateQuantityTourism>>(`${this.baseUrl}/tourism`,formData, {headers}).pipe(
      map((response: Apiresponse<UpdateQuantityTourism>) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  updateQuantityHotel(formData : FormData): Observable<UpdateQuantityHotel> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.patch<Apiresponse<UpdateQuantityHotel>>(`${this.baseUrl}/hotel`,formData, {headers}).pipe(
      map((response: Apiresponse<UpdateQuantityHotel>) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }
  deleteBookingDetail(id : number): Observable<boolean> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.delete<Apiresponse<boolean>>(`${this.baseUrl}?id=${id}`, {headers}).pipe(
      map((response: Apiresponse<boolean>) => {
        if (response.success) {
          return response.success;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }
  private createAuthorizationHeader(): HttpHeaders {
    let token = null;

    if (isPlatformBrowser(this.platformId)) {
      token = localStorage.getItem('token');
    }
    if (token) {
      console.log(token);
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }
    else {
      console.log('Token not found in local store');
    }
    return new HttpHeaders();
  }

  order(formData: FormData): Observable<OrderResponse> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.patch<Apiresponse<OrderResponse>>(`${this.baseUrl}/order`, formData, { headers }).pipe(
      map((response: Apiresponse<OrderResponse>) => {
        if (response.success) {
          return response.data; 
        } else {
          throw new Error(response.message);
        }
      })
    );
  }
  
  getUserInfo(idBooking: number): Observable<GetUserInfoResponse[]>{
    const headers = this.createAuthorizationHeader();
    return this.httpClient.get<Apiresponse<GetUserInfoResponse[]>>(`${this.baseUrl}/userinfo?idBooking=${idBooking}`, { headers }).pipe(
      map((response: Apiresponse<GetUserInfoResponse[]>) => {
        if (response.success) {
          return response.data; 
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  getUserJoin(idBooking: number):  Observable<GetUserJoinResponse[]>{
    const headers = this.createAuthorizationHeader();
    return this.httpClient.get<Apiresponse<GetUserJoinResponse[]>>(`${this.baseUrl}/userjoin?idBooking=${idBooking}`, { headers }).pipe(
      map((response: Apiresponse<GetUserJoinResponse[]>) => {
        if (response.success) {
          return response.data; 
        } else {
          throw new Error(response.message);
        }
      })
    );
  }
  
}
