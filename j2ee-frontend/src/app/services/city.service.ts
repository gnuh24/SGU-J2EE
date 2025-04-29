import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { env } from './env.dev';
import { CityCreateForm, CityUpdateForm } from '../models/city/city.response';
import { ApiResponse } from '../models/apiresponse';

@Injectable({
    providedIn: 'root'
})
export class CityService {

    private apiUrl = `${env.API_ROOT}/cities`;

    constructor(private http: HttpClient) { }

    getCities(
        pageSize: number,
        pageNumber: number,
        sort: string,
        search: string,
        status: string
    ): Observable<ApiResponse<any>> {
        const params = new HttpParams()
            .set('pageSize', pageSize.toString())
            .set('pageNumber', pageNumber.toString())
            .set('sort', sort)
            .set('search', search)
            .set('status', status);

        return this.http.get<ApiResponse<any>>(this.apiUrl, { params });
    }

    getCitiesNoPaging(): Observable<ApiResponse<any>> {
        return this.http.get<ApiResponse<any>>(this.apiUrl);
    }

    createCity(city: CityCreateForm): Observable<ApiResponse<any>> {
        return this.http.post<ApiResponse<any>>(this.apiUrl, city);
    }

    updateCity(id: string, city: CityUpdateForm): Observable<ApiResponse<any>> {
        return this.http.patch<ApiResponse<any>>(`${this.apiUrl}/${id}`, city);
    }

    deleteCity(id: string): Observable<ApiResponse<any>> {
        return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${id}`);
    }
}
