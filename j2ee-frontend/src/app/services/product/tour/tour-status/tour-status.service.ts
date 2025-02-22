import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Apiresponse } from '../../../../models/response/apiresponse';
import { CreateTourStatusRequest } from '../../../../models/request/product/tour/tour-status/create-tour-status-request';
import { CreateTourStatusResponse } from '../../../../models/response/product/tour/tour-status/create-tour-status-response';
import { UpdateTourStatusRequest } from '../../../../models/request/product/tour/tour-status/update-tour-status-request';
import { UpdateTourStatusResponse } from '../../../../models/response/product/tour/tour-status/update-tour-status-response';
import { GetTourStatusResponse } from '../../../../models/response/product/tour/tour-status/get-tour-status-response';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class TourStatusService {

  private baseUrl = `${environment.apiBaseUrl}/api/v1/tour-status`;

  constructor(private httpClient: HttpClient) { }

  createTourStatus(createTourStatusRequest: CreateTourStatusRequest): Observable<CreateTourStatusResponse> {
    return this.httpClient.post<Apiresponse<CreateTourStatusResponse>>(`${this.baseUrl}`, createTourStatusRequest).pipe(
      map((response: Apiresponse<CreateTourStatusResponse>) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  updateTourStatus(updateTourStatusRequest: UpdateTourStatusRequest): Observable<UpdateTourStatusResponse> {
    return this.httpClient.put<Apiresponse<UpdateTourStatusResponse>>(`${this.baseUrl}`, updateTourStatusRequest).pipe(
      map((response: Apiresponse<UpdateTourStatusResponse>) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  getTourStatus(id: number): Observable<GetTourStatusResponse> {
    return this.httpClient.get<Apiresponse<GetTourStatusResponse>>(`${this.baseUrl}?id=${id}`).pipe(
      map((response: Apiresponse<GetTourStatusResponse>) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }
}
