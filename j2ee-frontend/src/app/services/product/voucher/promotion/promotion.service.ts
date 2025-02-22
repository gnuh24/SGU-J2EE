import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Apiresponse } from '../../../../models/response/apiresponse';
import { CreatePromotionRequest } from '../../../../models/request/product/voucher/promotion/create-promotion-request';
import { CreatePromotionResponse } from '../../../../models/response/product/voucher/promotion/create-promotion-response';
import { UpdatePromotionRequest } from '../../../../models/request/product/voucher/promotion/update-promotion-request';
import { UpdatePromotionResponse } from '../../../../models/response/product/voucher/promotion/update-promotion-response';
import { GetPromotionResponse } from '../../../../models/response/product/voucher/promotion/get-promotion-response';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  private baseUrl = `${environment.apiBaseUrl}/api/v1/promotion`;

  constructor(private httpClient: HttpClient) { }

  createPromotion(formData: FormData): Observable<CreatePromotionResponse> {
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
    const headers= this.createAuthorizationHeader();
    return this.httpClient.post<Apiresponse<CreatePromotionResponse>>(`${this.baseUrl}`, formData, {headers}).pipe(
      map((response: Apiresponse<CreatePromotionResponse>) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  updatePromotion(formData: FormData): Observable<UpdatePromotionResponse> {
    const headers= this.createAuthorizationHeader();
    return this.httpClient.patch<Apiresponse<UpdatePromotionResponse>>(`${this.baseUrl}`, formData, {headers}).pipe(
      map((response: Apiresponse<UpdatePromotionResponse>) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  getPromotion(id: number): Observable<GetPromotionResponse> {
    const headers= this.createAuthorizationHeader();
    return this.httpClient.get<Apiresponse<GetPromotionResponse>>(`${this.baseUrl}?id=${id}`, {headers}).pipe(
      map((response: Apiresponse<GetPromotionResponse>) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  getAll(): Observable<GetPromotionResponse[]> {
    const headers= this.createAuthorizationHeader();
    return this.httpClient.get<Apiresponse<GetPromotionResponse[]>>(`${this.baseUrl}/all`, {headers}).pipe(
      map((response: Apiresponse<GetPromotionResponse[]>) => {
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
