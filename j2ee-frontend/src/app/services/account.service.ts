import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { env } from './env.dev';
import { ApiResponse } from '../models/apiresponse';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

    private apiUrl = `${env.API_ROOT}/accounts`;

    constructor(private http: HttpClient) {}

    getAccounts(
        pageSize: number,
        pageNumber: number,
        sort: string,
        search: string,
        status: string // 'ACTIVE', 'INACTIVE', 'BANNED'
    ): Observable<ApiResponse<any>> {
        const params = new HttpParams()
        .set('pageSize', pageSize.toString())
        .set('pageNumber', pageNumber.toString())
        .set('sort', sort)
        .set('search', search)
        .set('status', status);

        return this.http.get<ApiResponse<any>>(this.apiUrl, { params });
    }

    updateAccountStatus(id: string, status: 'ACTIVE' | 'INACTIVE' | 'BANNED'): Observable<ApiResponse<any>> {
        const url = `${this.apiUrl}/${id}/status`;
        return this.http.patch<ApiResponse<any>>(url, { status });
    }
}
