import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Apiresponse } from '../../../../models/response/apiresponse';
import { CreateTicketRequest } from '../../../../models/request/product/ticket/ticket/create-ticket-request';
import { CreateTicketResponse } from '../../../../models/response/product/ticket/ticket/create-ticket-response';
import { UpdateTicketRequest } from '../../../../models/request/product/ticket/ticket/update-ticket-request';
import { UpdateTicketResponse } from '../../../../models/response/product/ticket/ticket/update-ticket-response';
import { GetTicketResponse } from '../../../../models/response/product/ticket/ticket/get-ticket-response';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private baseUrl = `${environment.apiBaseUrl}/api/v1/ticket`;

  constructor(private httpClient: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) { }

  createTicket(formData: FormData): Observable<CreateTicketResponse> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.post<Apiresponse<CreateTicketResponse>>(`${this.baseUrl}`, formData, {headers}).pipe(
      map((response: Apiresponse<CreateTicketResponse>) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  updateTicket(formData: FormData): Observable<UpdateTicketResponse> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.patch<Apiresponse<UpdateTicketResponse>>(`${this.baseUrl}`, formData, {headers}).pipe(
      map((response: Apiresponse<UpdateTicketResponse>) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  getTicket(id: number): Observable<GetTicketResponse> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.get<Apiresponse<GetTicketResponse>>(`${this.baseUrl}?id=${id}`, {headers}).pipe(
      map((response: Apiresponse<GetTicketResponse>) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  getTicketByIdTourism(id:number):  Observable<GetTicketResponse[]> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.get<Apiresponse<GetTicketResponse[]>>(`${this.baseUrl}/ticket?idTourism=${id}`, {headers}).pipe(
      map((response: Apiresponse<GetTicketResponse[]>) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  getAllTickets(): Observable<GetTicketResponse[]> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.get<Apiresponse<GetTicketResponse[]>>(`${this.baseUrl}/all`, {headers}).pipe(
      map((response: Apiresponse<GetTicketResponse[]>) => {
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
    return new HttpHeaders();
  }
}
