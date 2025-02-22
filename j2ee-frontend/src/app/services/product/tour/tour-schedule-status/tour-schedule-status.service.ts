import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Apiresponse } from '../../../../models/response/apiresponse';
import { CreateTourScheduleStatusRequest } from '../../../../models/request/product/tour/tour-schedule-status/create-tour-schedule-status-request';
import { CreateTourScheduleStatusResponse } from '../../../../models/response/product/tour/tour-schedule-status/create-tour-schedule-status-request';
import { UpdateTourScheduleStatusRequest } from '../../../../models/request/product/tour/tour-schedule-status/update-tour-schedule-status-request';
import { UpdateTourScheduleStatusResponse } from '../../../../models/response/product/tour/tour-schedule-status/update-tour-schedule-status-request';
import { GetTourScheduleStatusResponse } from '../../../../models/response/product/tour/tour-schedule-status/get-tour-schedule-status-response';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class TourScheduleStatusService {

  private baseUrl = `${environment.apiBaseUrl}/api/v1/tour-schedule-status`;

  constructor(private httpClient: HttpClient) { }

  createScheduleStatus(createScheduleStatusRequest: CreateTourScheduleStatusRequest): Observable<CreateTourScheduleStatusResponse> {
    const headers =this.createAuthorizationHeader();
    return this.httpClient.post<Apiresponse<CreateTourScheduleStatusResponse>>(`${this.baseUrl}`, createScheduleStatusRequest, {headers}).pipe(
      map((response: Apiresponse<CreateTourScheduleStatusResponse>) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  updateScheduleStatus(updateScheduleStatusRequest: UpdateTourScheduleStatusRequest): Observable<UpdateTourScheduleStatusResponse> {
    const headers =this.createAuthorizationHeader();
    return this.httpClient.put<Apiresponse<UpdateTourScheduleStatusResponse>>(`${this.baseUrl}`, updateScheduleStatusRequest, {headers}).pipe(
      map((response: Apiresponse<UpdateTourScheduleStatusResponse>) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  getScheduleStatus(id: number): Observable<GetTourScheduleStatusResponse> {
    const headers =this.createAuthorizationHeader();
    return this.httpClient.get<Apiresponse<GetTourScheduleStatusResponse>>(`${this.baseUrl}?id=${id}`, {headers}).pipe(
      map((response: Apiresponse<GetTourScheduleStatusResponse>) => {
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
