import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Apiresponse } from '../../../../models/response/apiresponse';
import { CreateTourRequest } from '../../../../models/request/product/tour/tour/create-tour-request';
import { CreateTourResponse } from '../../../../models/response/product/tour/tour/create-tour-response';
import { UpdateTourRequest } from '../../../../models/request/product/tour/tour/update-tour-request';
import { UpdateTourResponse } from '../../../../models/response/product/tour/tour/update-tour-response';
import { GetTourResponse } from '../../../../models/response/product/tour/tour/get-tour-response';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class TourService {

  private baseUrl = `${environment.apiBaseUrl}/api/v1/tour`;

  constructor(private httpClient: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) { }

  createTour(fromData: FormData): Observable<CreateTourResponse> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.post<Apiresponse<CreateTourResponse>>(`${this.baseUrl}`, fromData, {headers}).pipe(
      map((response: Apiresponse<CreateTourResponse>) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  updateTour(fomrData: FormData): Observable<UpdateTourResponse> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.patch<Apiresponse<UpdateTourResponse>>(`${this.baseUrl}`, fomrData, {headers}).pipe(
      map((response: Apiresponse<UpdateTourResponse>) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  getTour(id: number): Observable<GetTourResponse> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.get<Apiresponse<GetTourResponse>>(`${this.baseUrl}/id/${id}`, {headers}).pipe(
      map((response: Apiresponse<GetTourResponse>) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  getAllTour(): Observable<GetTourResponse[]> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.get<Apiresponse<GetTourResponse[]>>(`${this.baseUrl}`, {headers}).pipe(
      map((response: Apiresponse<GetTourResponse[]>) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  getTourByCategory(category: string): Observable<GetTourResponse[]> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.get<Apiresponse<GetTourResponse[]>>(`${this.baseUrl}/${category}`, {headers}).pipe(
      map((response: Apiresponse<GetTourResponse[]>) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  getTourById(id: number): Observable<GetTourResponse> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.get<Apiresponse<GetTourResponse>>(`${this.baseUrl}/id/${id}`, {headers}).pipe(
      map((response: Apiresponse<GetTourResponse>) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  getTourDetailById(id: number): Observable<GetTourResponse> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.get<Apiresponse<GetTourResponse>>(`${this.baseUrl}/detail?id=${id}`, {headers}).pipe(
      map((response: Apiresponse<GetTourResponse>) => {
        if (response.success) {
          return response.data;
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
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }
    else {
      console.log('Token not found in local store');
    }
    return new HttpHeaders();
  }
}
