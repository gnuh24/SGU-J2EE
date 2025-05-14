import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { env } from './env.dev';
import { ApiResponse } from '../models/apiresponse';
import { RouteCreateForm, RouteUpdateForm } from '../models/route.response';

@Injectable({
    providedIn: 'root'
})
export class RouteService {

    private apiUrl = `${env.API_ROOT}/routes`;

    constructor(private http: HttpClient) { }

    /**
     * Lấy danh sách các tuyến đường
     * @param pageSize Số lượng mỗi trang
     * @param pageNumber Trang hiện tại
     * @param search Từ khóa tìm kiếm
     * @param sort Tiêu chí sắp xếp
     * @returns Observable<ApiResponse<any>>
     */
    getRoutes(
        pageSize: number,
        pageNumber: number,
        sort: string,
        search: string,
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

    /**
     * Lấy thông tin chi tiết tuyến đường theo ID
     * @param id ID tuyến đường
     * @returns Observable<ApiResponse<any>>
     */
    getRouteById(id: string): Observable<ApiResponse<any>> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.get<ApiResponse<any>>(url);
    }

    createRoute(routeData: RouteCreateForm): Observable<any> {
        return this.http.post(this.apiUrl, routeData);
    }


    /**
     * Cập nhật thông tin tuyến đường
     * @param id ID tuyến đường
     * @param routeData Dữ liệu cần cập nhật
     * @returns Observable<ApiResponse<any>>
     */
    updateRoute(id: string, routeData: RouteUpdateForm): Observable<ApiResponse<any>> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.patch<ApiResponse<any>>(url, routeData);
    }
}
