import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { Apiresponse } from '../../models/response/apiresponse';

import { catchError, map } from 'rxjs/operators';
import { registerUserResponse } from '../../models/response/user/register-response';
import { loginUserResponse } from '../../models/response/user/login-response';
import { RefreshToken } from '../../models/response/user/refresh-token';
import { GetCurrentUserResponse } from '../../models/response/user/get-current-user-response';
import { isPlatformBrowser } from '@angular/common';
import { GetUserInfoResponse } from '../../models/response/user/user-info/get-user-info-response';
import { GetUserJoinResponse } from '../../models/response/user/user-join/get-user-join-response';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL = `${environment.apiBaseUrl}/api/v1/auth/`;
  constructor(private http: HttpClient, private router: Router, @Inject(PLATFORM_ID) private platformId: Object) { }

  registerUser(formData: FormData): Observable<registerUserResponse> {
    return this.http.post<Apiresponse<registerUserResponse>>(`${this.baseURL}registration`, formData).pipe(
      map((response: Apiresponse<registerUserResponse>) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error('Registration failed'); // Ném lỗi nếu không thành công
        }
      })
    );
  }

  loginUser(formData: FormData): Observable<loginUserResponse> {
    return this.http.post<Apiresponse<loginUserResponse>>(`${this.baseURL}login`, formData).pipe(
      map((response: Apiresponse<loginUserResponse>) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error('Login failed');
        }
      })
    );
  }

  refreshToken(tokenData: RefreshToken): Observable<loginUserResponse> {
    return this.http.post<Apiresponse<loginUserResponse>>(`${this.baseURL}refreshToken`, tokenData).pipe(
      map((response: Apiresponse<loginUserResponse>) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error('Refresh token failed');
        }
      })
    );
  }

  
    
  getCurrentUser(): Observable<GetCurrentUserResponse> {
    console.log('Getting current user' );
    const headers = this.createAuthorizationHeader();
    console.log('Authorization header:', headers);
    return this.http.get<Apiresponse<GetCurrentUserResponse>>(`${this.baseURL}currentUser`, {headers}).pipe(
      map((response) => {
        if (response) {
          console.log('Current user response:', response.data);
          return response.data;
        } else {
          throw new Error('Get current user failed');
        } 
      }),
      catchError((error) => {
        if (error.status === 401) {
          this.router.navigate(['/login']);
        }
        return throwError(error);
      })
    );
  }

  getUserInfo(idBooking:number): Observable<GetUserInfoResponse[]>{
    const headers = this.createAuthorizationHeader();
    return this.http.get<Apiresponse<GetUserInfoResponse[]>>(`${this.baseURL}/userInfo?idBooking=${idBooking}`, {headers}).pipe(
      map((response: Apiresponse<GetUserInfoResponse[]>) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  getUserJoin(idBooking:number): Observable<GetUserJoinResponse[]>{
    const headers = this.createAuthorizationHeader();
    return this.http.get<Apiresponse<GetUserJoinResponse[]>>(`${this.baseURL}/userJoin?idBooking=${idBooking}`, {headers}).pipe(
      map((response: Apiresponse<GetUserJoinResponse[]>) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }




  private createAuthorizationHeader(): HttpHeaders {
    let token = null;

    if (isPlatformBrowser(this.platformId)) {
      token = localStorage.getItem('token');
    }
    if (token) {
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }
    else {
      console.log('Token not found in local store');
    }
    return new HttpHeaders();
  }



}
