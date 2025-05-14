import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/apiresponse';
import { env } from './env.dev';
import { CoachCreateForm, CoachUpdateForm } from '../models/coach.response';

@Injectable({
    providedIn: 'root'
})
export class CoachService {
    private apiUrl = `${env.API_ROOT}/coaches`;

    constructor(private http: HttpClient) { }

    getCoaches(
        pageSize: number,
        pageNumber: number,
        sort: string,
        search: string,
        status: string
    ): Observable<ApiResponse<any>> {
        const params = new HttpParams()
            .set('pageSize', pageSize)
            .set('pageNumber', pageNumber)
            .set('search', search)
            .set('sort', sort)
            .set('status', status); // Thêm tham số status vào HttpParams nếu cần

        return this.http.get<ApiResponse<any>>(this.apiUrl, { params });
    }


    createCoach(Coach: CoachCreateForm): Observable<ApiResponse<any>> {
        return this.http.post<ApiResponse<any>>(this.apiUrl, Coach);
    }

    updateCoach(id: string, Coach: CoachUpdateForm): Observable<ApiResponse<any>> {
        return this.http.patch<ApiResponse<any>>(`${this.apiUrl}/${id}`, Coach);
    }
}
