import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Apiresponse } from '../../../../models/response/apiresponse';
import { CreateTourScheduleRequest } from '../../../../models/request/product/tour/tour-schedule/create-tour-schedule-request';
import { CreateTourScheduleResponse } from '../../../../models/response/product/tour/tour-schedule/create-tour-schedule-response';
import { UpdateTourScheduleRequest } from '../../../../models/request/product/tour/tour-schedule/update-tour-schedule-request';
import { UpdateTourScheduleResponse } from '../../../../models/response/product/tour/tour-schedule/update-tour-schedule-response';
import { GetTourScheduleResponse } from '../../../../models/response/product/tour/tour-schedule/get-tour-schedule-response';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class TourScheduleService {

  private baseUrl = `${environment.apiBaseUrl}/api/v1/tour-schedule`;

  constructor(private httpClient: HttpClient) { }

  createSchedule(formData: FormData): Observable<CreateTourScheduleResponse> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.post<Apiresponse<CreateTourScheduleResponse>>(`${this.baseUrl}`, formData, {headers}).pipe(
      map((response: Apiresponse<CreateTourScheduleResponse>) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  updateSchedule(formData: FormData): Observable<UpdateTourScheduleResponse> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.patch<Apiresponse<UpdateTourScheduleResponse>>(`${this.baseUrl}`, formData, {headers}).pipe(
      map((response: Apiresponse<UpdateTourScheduleResponse>) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  getAllTourSchedule(): Observable<UpdateTourScheduleRequest[]> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.get<Apiresponse<GetTourScheduleResponse[]>>(`${this.baseUrl}/all`, {headers}).pipe(
      map((response: Apiresponse<GetTourScheduleResponse[]>) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );

  }

  getSchedule(id: number): Observable<GetTourScheduleResponse> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.get<Apiresponse<GetTourScheduleResponse>>(`${this.baseUrl}?id=${id}`, {headers}).pipe(
      map((response: Apiresponse<GetTourScheduleResponse>) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  getTourScheduleByidTour(id:number):Observable<GetTourScheduleResponse[]> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.get<Apiresponse<GetTourScheduleResponse[]>>(`${this.baseUrl}/tour?idTour=${id}`, {headers}).pipe(
      map((response: Apiresponse<GetTourScheduleResponse[]>) => {
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
  
}
