import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateHotelBookingRequest } from '../../../../models/request/product/hotel/hotel-booking/create-hotelbooking-request';
import { map, Observable } from 'rxjs';
import { Apiresponse } from '../../../../models/response/apiresponse';
import { CreateHotelBookingResponse } from '../../../../models/response/product/hotel/hotel-booking/create-hotelbooking-response';
import { UpdateHotelBookingRequest } from '../../../../models/request/product/hotel/hotel-booking/update-hotelbooking-request';
import { UpdateHotelBookingResponse } from '../../../../models/response/product/hotel/hotel-booking/update-hotelbooking-response';
import { GetHotelBookingResponse } from '../../../../models/response/product/hotel/hotel-booking/get-hotelbooking-response';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class HotelbookingService {

  private baseUrl = `${environment.apiBaseUrl}/api/v1/hotel-booking`;

  constructor(private httpClient: HttpClient) { }

  createBooking(formData: FormData): Observable<CreateHotelBookingResponse> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.post<Apiresponse<CreateHotelBookingResponse>>(`${this.baseUrl}`, formData, {headers}).pipe(
      map((response: Apiresponse<CreateHotelBookingResponse>) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  updateBooking(formData: FormData): Observable<UpdateHotelBookingResponse> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.patch<Apiresponse<UpdateHotelBookingResponse>>(`${this.baseUrl}`, formData, {headers}).pipe(
      map((response: Apiresponse<UpdateHotelBookingResponse>) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  getBooking(id: number): Observable<GetHotelBookingResponse> {
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


  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (token) {
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }
    else {
      console.log('Token not found in local store');
    }
    return new HttpHeaders();
  }

  getHotelByIdBooking(id: number): Observable<GetHotelBookingResponse[]> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.get<Apiresponse<GetHotelBookingResponse[]>>(`${this.baseUrl}/hotelbooking?idHotel=${id}`, {headers}).pipe(
      map((response: Apiresponse<GetHotelBookingResponse[]>) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  getAllHotelBooking():  Observable<GetHotelBookingResponse[]> {
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
}
