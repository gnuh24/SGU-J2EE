import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/apiresponse'; // Tùy chỉnh lại nếu bạn có model riêng
import { env } from './env.dev';

@Injectable({
    providedIn: 'root'
})
export class StatisticService {

    private apiUrl = `${env.API_ROOT}/statistics`;

    constructor(private http: HttpClient) { }

    getGeneralStatistic(): Observable<ApiResponse<any>> {
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth() + 1; // getMonth() trả về 0–11

        const params = new HttpParams()
            .set('year', currentYear.toString())
            .set('month', currentMonth.toString());

        return this.http.get<ApiResponse<any>>(this.apiUrl + "/general", { params });
    }



}
