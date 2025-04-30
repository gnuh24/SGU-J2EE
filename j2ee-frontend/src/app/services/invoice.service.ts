import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/apiresponse';
import { env } from './env.dev';

@Injectable({
    providedIn: 'root'
})
export class InvoiceService {
    private apiUrl = `${env.API_ROOT}/invoices`;

    constructor(private http: HttpClient) { }

    getInvoices(
        pageSize: number,
        pageNumber: number,
        search: string,
        sort: string // Thêm tham số sort vào đây
    ): Observable<ApiResponse<any>> {
        const params = new HttpParams()
            .set('pageSize', pageSize.toString())
            .set('pageNumber', pageNumber.toString())
            .set('search', search)
            .set('sort', sort); // Thêm tham số sort vào HttpParams

        return this.http.get<ApiResponse<any>>(this.apiUrl, { params });
    }


    // getById(id: number): Observable<ApiResponse> {
    //     return this.http.get<ApiResponse>(`${this.baseUrl}/${id}`);
    // }

    // delete(id: number): Observable<ApiResponse> {
    //     return this.http.delete<ApiResponse>(`${this.baseUrl}/${id}`);
    // }
}
