import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/apiresponse'; // Tùy chỉnh lại nếu bạn có model riêng
import { env } from './env.dev';

@Injectable({
    providedIn: 'root'
})
export class TicketService {

    private apiUrl = `${env.API_ROOT}/tickets`;

    constructor(private http: HttpClient) { }

    getTickets(
        size: number,
        page: number,
        sort: string,
        search: string = '',
        status: string = ''
    ): Observable<ApiResponse<any>> {
        let params = new HttpParams()
            .set('size', size)
            .set('page', page)
            .set('sort', sort)
            .set('search', search)
            .set('status', status);


        return this.http.get<ApiResponse<any>>(this.apiUrl, { params });
    }

    getTicketById(id: string): Observable<ApiResponse<any>> {
        return this.http.get<ApiResponse<any>>(`${this.apiUrl}/${id}`);
    }

    createTicket(ticketData: FormData | any): Observable<ApiResponse<any>> {
        return this.http.post<ApiResponse<any>>(this.apiUrl, ticketData);
    }

    updateTicket(id: string, ticketData: FormData | any): Observable<ApiResponse<any>> {
        return this.http.put<ApiResponse<any>>(`${this.apiUrl}/${id}`, ticketData);
    }

    deleteTicket(id: string): Observable<ApiResponse<any>> {
        return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${id}`);
    }
}
