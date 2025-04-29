import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { env } from './env.dev';
import { ApiResponse } from '../models/apiresponse';
import { StationCreateForm, StationUpdateForm } from '../models/station.response';

@Injectable({
    providedIn: 'root'
})
export class StationService {

    private apiUrl = `${env.API_ROOT}/coach-stations`;

    constructor(private http: HttpClient) {}

    getStations(
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

    getStationsNoPaging(): Observable<ApiResponse<any>> {
        return this.http.get<ApiResponse<any>>(this.apiUrl);
    }

    createStation(station: StationCreateForm): Observable<ApiResponse<any>> {
        return this.http.post<ApiResponse<any>>(this.apiUrl, station);
    }

    updateStation(id: string, station: StationUpdateForm): Observable<ApiResponse<any>> {
        return this.http.patch<ApiResponse<any>>(`${this.apiUrl}/${id}`, station);
    }

    deleteStation(id: string): Observable<ApiResponse<any>> {
        return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${id}`);
    }
}
