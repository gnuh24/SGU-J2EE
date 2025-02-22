import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StatisticYear } from '../../models/response/statistics/StatisticYear';
import { map, Observable } from 'rxjs';
import { Apiresponse } from '../../models/response/apiresponse';
import { StatisticMonthYear } from '../../models/response/statistics/StatisticMonthYear';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private baseUrl = `${environment.apiBaseUrl}/api/v1/statistic`;

  constructor(private httpClient: HttpClient) { }

  getStatisticYear(year: number): Observable<StatisticYear> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.get<Apiresponse<StatisticYear>>(`${this.baseUrl}/year?year=${year}`, {headers}).pipe(
      map((response: Apiresponse<StatisticYear>) => {
        if (response.success) {
          console.log(response.data);
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    )
  }

  getStatisticMonthYear(month: number, year: number){
    const headers = this.createAuthorizationHeader();
    return this.httpClient.get<Apiresponse<StatisticMonthYear>>(`${this.baseUrl}/monthyear?month=${month}&year=${year}`, {headers}).pipe(
      map((response: Apiresponse<StatisticMonthYear>) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    )
  }

  getStatisticMonthHotel(month: number, year: number){
    const headers = this.createAuthorizationHeader();
    return this.httpClient.get<Apiresponse<StatisticMonthYear>>(`${this.baseUrl}/month/hotel?month=${month}&year=${year}`, {headers}).pipe(
      map((response: Apiresponse<StatisticMonthYear>) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    )
  }

  getStatisticMonthTour(month: number, year: number){
    const headers = this.createAuthorizationHeader();
    return this.httpClient.get<Apiresponse<StatisticMonthYear>>(`${this.baseUrl}/month/tour?month=${month}&year=${year}`, {headers}).pipe(
      map((response: Apiresponse<StatisticMonthYear>) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    )
  }

  getStatisticMonthTourism(month: number, year: number){
    const headers = this.createAuthorizationHeader();
    return this.httpClient.get<Apiresponse<StatisticMonthYear>>(`${this.baseUrl}/month/tourism?month=${month}&year=${year}`, {headers}).pipe(
      map((response: Apiresponse<StatisticMonthYear>) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    )
  }

  getStatisticTodayHotel(){
    const headers = this.createAuthorizationHeader();
    return this.httpClient.get<Apiresponse<StatisticMonthYear>>(`${this.baseUrl}/today/hotel`, {headers}).pipe(
      map((response: Apiresponse<StatisticMonthYear>) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    )
  }

  getStatisticTodayTour(){
    const headers = this.createAuthorizationHeader();
    return this.httpClient.get<Apiresponse<StatisticMonthYear>>(`${this.baseUrl}/today/tour`, {headers}).pipe(
      map((response: Apiresponse<StatisticMonthYear>) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    )
  }

  getStatisticTodayTourism(){
    const headers = this.createAuthorizationHeader();
    return this.httpClient.get<Apiresponse<StatisticMonthYear>>(`${this.baseUrl}/today/tourism`, {headers}).pipe(
      map((response: Apiresponse<StatisticMonthYear>) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    )
  }

  getStatisticYesterdayHotel(){
    const headers = this.createAuthorizationHeader();
    return this.httpClient.get<Apiresponse<StatisticMonthYear>>(`${this.baseUrl}/yesterday/hotel`, {headers}).pipe(
      map((response: Apiresponse<StatisticMonthYear>) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    )
  }

  getStatisticYesterdayTour(){
    const headers = this.createAuthorizationHeader();
    return this.httpClient.get<Apiresponse<StatisticMonthYear>>(`${this.baseUrl}/yesterday/tour`, {headers}).pipe(
      map((response: Apiresponse<StatisticMonthYear>) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    )
  }

  getStatisticYesterdayTourism(){
    const headers = this.createAuthorizationHeader();
    return this.httpClient.get<Apiresponse<StatisticMonthYear>>(`${this.baseUrl}/yesterday/tourism`, {headers}).pipe(
      map((response: Apiresponse<StatisticMonthYear>) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    )
  }

  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (token) {
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }
    else {
      console.log('Token not found in local store');
    }
    return new HttpHeaders();
  }

}
