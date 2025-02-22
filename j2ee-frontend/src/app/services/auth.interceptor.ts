import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError, of, from } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { UserService } from '../services/user/user.service';
import { RefreshToken } from '../models/response/user/refresh-token';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private userService: UserService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Giả định rằng bạn đã lưu token trong local storage hoặc session storage
        const token = localStorage.getItem('token');

        // Thêm token vào header nếu có
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }
        console.log('Request headers:', request.headers);

        return next.handle(request).pipe(
            catchError(err => {
                // Kiểm tra nếu lỗi do token hết hạn (HTTP 401)
                if (err.status === 401) {
                    const refreshTokenData: RefreshToken = { /* lấy refresh token từ đâu đó */ };

                    // Gọi hàm refreshToken
                    return this.userService.refreshToken(refreshTokenData).pipe(
                        switchMap((response) => {
                            console.log('Refresh token API response:', response);
                            console.log('Old token:', response.accessToken);
                            const token = localStorage.getItem('token');

                            if (token && response.accessToken !== token && response.accessToken) {
                                console.log('New token:', response.accessToken);
                                localStorage.setItem('token', response.accessToken); // Điều chỉnh tên thuộc tính cho đún
                            }


                            // Cloned lại request với token mới
                            request = request.clone({
                                setHeaders: {
                                    Authorization: `Bearer ${response.accessToken}`
                                }
                            });

                            // Gửi lại request gốc
                            return next.handle(request);
                        }),
                        catchError(refreshError => {
                            // Xử lý lỗi refresh token, có thể điều hướng đến trang đăng nhập
                            return throwError(refreshError);
                        })
                    );
                }
                return throwError(err);
            })
        );
    }
}
