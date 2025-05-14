import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { env } from './env.dev';
import { ApiResponse } from '../models/apiresponse';
import { ProfileResponse } from '../models/profile.model';
import { AuthStateService } from './auth-state.service';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    private apiUrl = 'http://localhost:8080/api';

    constructor(
        private http: HttpClient,
        private authState: AuthStateService
    ) { }

    /**
     * Lấy danh sách các profiles
     * @param pageSize Số lượng profile trên mỗi trang
     * @param pageNumber Trang hiện tại
     * @param search Từ khóa tìm kiếm
     * @param sort Tiêu chí sắp xếp
     * @returns Observable<ApiResponse<any>>
     */
    getProfiles(
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

    /**
     * Lấy thông tin chi tiết profile theo ID
     * @param id ID của profile
     * @returns Observable<ApiResponse<any>>
     */
    getProfileById(id: string): Observable<ApiResponse<any>> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.get<ApiResponse<any>>(url);
    }

    /**
     * Cập nhật thông tin profile của người dùng (me)
     * @param profileData Dữ liệu profile để cập nhật
     * @returns Observable<ApiResponse<any>>
     */
    updateProfile(profileData: any): Observable<ProfileResponse> {
        const idUser = this.authState.getIdUser();
        return this.http.put<ProfileResponse>(`${this.apiUrl}/profiles/${idUser}`, profileData);
    }

    getProfile(): Observable<ProfileResponse> {
        const idUser = this.authState.getIdUser();
        return this.http.get<ProfileResponse>(`${this.apiUrl}/profiles/${idUser}`);
    }
}
