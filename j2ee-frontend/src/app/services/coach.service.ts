import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/apiresponse';
import { env } from './env.dev';

@Injectable({
    providedIn: 'root'
})
export class CoachService {
    private apiUrl = `${env.API_ROOT}/coaches`;

    constructor(private http: HttpClient) { }

    getCoaches(
        pageSize: number,
        pageNumber: number,
        search: string,
        sort: string,
        status: string
    ): Observable<ApiResponse<any>> {
        const params = new HttpParams()
            .set('pageSize', pageSize.toString())
            .set('pageNumber', pageNumber.toString())
            .set('search', search)
            .set('sort', sort)
            .set('status', status); // Thêm tham số status vào HttpParams nếu cần

        return this.http.get<ApiResponse<any>>(this.apiUrl, { params });
    }

    // Nếu sau này bạn cần lấy chi tiết hoặc xóa theo ID, bạn có thể bỏ comment như dưới đây:
    // getById(id: number): Observable<ApiResponse<any>> {
    //     return this.http.get<ApiResponse<any>>(`${this.apiUrl}/${id}`);
    // }

    // delete(id: number): Observable<ApiResponse<any>> {
    //     return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${id}`);
    // }
}
