import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { GetBookingResponse } from '../../../../models/response/booking/get-booking-response';
import { StatisticMonthYear } from '../../../../models/response/statistics/StatisticMonthYear';
import { StatisticsService } from '../../../../services/statistics/statistics.service';

interface Invoice {
    date: string;
    invoiceNumber: string;
    customer: string;
    amount: string;
    status: string;
}

@Component({
  selector: 'app-tour-statistics',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './tour-statistics.component.html',
  styleUrls: ['./tour-statistics.component.css']
})
export class TourStatisticsComponent implements OnInit {
  todayStatistic?: StatisticMonthYear;
  yesterdayStatistic?: StatisticMonthYear;
  monthStatistic?: StatisticMonthYear;
  statisticMonthYear?: StatisticMonthYear;

  selectedMonth: number =0;
  selectedYear: number =0;
  months = [
    { name: 'January', value: 1 },
    { name: 'February', value: 2 },
    { name: 'March', value: 3 },
    { name: 'April', value: 4 },
    { name: 'May', value: 5 },
    { name: 'June', value: 6 },
    { name: 'July', value: 7 },
    { name: 'August', value: 8 },
    { name: 'September', value: 9 },
    { name: 'October', value: 10 },
    { name: 'November', value: 11 },
    { name: 'December', value: 12 },
  ];
  years: number[] = [];

  constructor(private statisticService: StatisticsService){}

  ngOnInit() {
    this.years = this.generateYears(2020, new Date().getFullYear());
    this.getStatisticTodayTour();
    this.getStatisticYesterdayTour();
    this.getStatisticMonthTour(new Date().getMonth(), new Date().getFullYear())
  }

  generateYears(start: number, end: number): number[] {
    const years = [];
    for (let year = start; year <= end; year++) {
      years.push(year);
    }
    return years;
  }

  filterMonth(){
    console.log(this.selectedMonth + this.selectedYear);
    this.getStatisticMonthTour(this.selectedMonth, this.selectedYear);
  }

  getStatisticTodayTour(){
    this.statisticService.getStatisticTodayTour().subscribe({
      next: (data) =>{
        if(data){
          this.todayStatistic = data;
        }
      }
    })
  }

  getStatisticYesterdayTour(){
    this.statisticService.getStatisticYesterdayTour().subscribe({
      next: (data) =>{
        if(data){
          this.yesterdayStatistic = data;
        }
      }
    })
  }

  getStatisticMonthTour(month:number, year:number){
    this.statisticService.getStatisticMonthTour(month, year).subscribe({
      next: (data) =>{
        if(data){
          this.monthStatistic = data;
        }
      }
    })
  }

}
