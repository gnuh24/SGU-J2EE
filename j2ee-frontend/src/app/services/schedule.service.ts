import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { env } from './env.dev';
import { ApiResponse } from '../models/apiresponse';
import { ScheduleCreateForm, ScheduleUpdateForm } from '../models/schedule';

@Injectable({
    providedIn: 'root'
})
export class ScheduleService {

    private apiUrl = `${env.API_ROOT}/schedules`;

    constructor(private http: HttpClient) { }

    /**
     * Lấy danh sách các lịch trình
     * @param pageSize Số lượng mỗi trang
     * @param pageNumber Trang hiện tại
     * @param sort Tiêu chí sắp xếp
     * @param search Từ khóa tìm kiếm
     * @param status Trạng thái
     * @returns Observable<ApiResponse<any>>
     */
    getSchedules(
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
            .set('status', status);

        return this.http.get<ApiResponse<any>>(this.apiUrl, { params });
    }

    /**
     * Lấy thông tin chi tiết lịch trình theo ID
     * @param id ID lịch trình
     * @returns Observable<ApiResponse<any>>
     */
    getScheduleById(id: string): Observable<ApiResponse<any>> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.get<ApiResponse<any>>(url);
    }

    /**
 * Cập nhật thông tin lịch trình
 * @param id ID lịch trình
 * @param scheduleData Dữ liệu cần cập nhật
 * @returns Observable<ApiResponse<any>>
 */
    createSchedule(scheduleData: ScheduleCreateForm): Observable<ApiResponse<any>> {
        const url = `${this.apiUrl}`;
        return this.http.post<ApiResponse<any>>(url, scheduleData);
    }

    /**
     * Cập nhật thông tin lịch trình
     * @param id ID lịch trình
     * @param scheduleData Dữ liệu cần cập nhật
     * @returns Observable<ApiResponse<any>>
     */
    updateSchedule(id: string, scheduleData: ScheduleUpdateForm): Observable<ApiResponse<any>> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.patch<ApiResponse<any>>(url, scheduleData);
    }
}
