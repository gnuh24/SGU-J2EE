import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { env } from './env.dev';
import { CityCreateForm, CityUpdateForm } from '../models/city.response';
import { ApiResponse } from '../models/apiresponse';
import { City } from '../models/city.model';

@Injectable({
    providedIn: 'root'
})
export class CityService {

    private apiUrl = `${env.API_ROOT}/cities`;

    constructor(private http: HttpClient) { }

    

    getCitiesNoPaging(): Observable<ApiResponse<any>> {
        return this.http.get<ApiResponse<any>>(`${this.apiUrl}/no-paging`);
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

    getCities(): Observable<City[]> {
        return this.http.get<any>(`${this.apiUrl}/no-paging`).pipe(
            map(res => res.data as City[])
        );
    }
}
