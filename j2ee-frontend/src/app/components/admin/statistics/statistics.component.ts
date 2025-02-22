import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
import { StatisticMonthYear } from '../../../models/response/statistics/StatisticMonthYear';
import { StatisticsService } from '../../../services/statistics/statistics.service';
import { StatisticYear } from '../../../models/response/statistics/StatisticYear';
import { StatisticMonths } from '../../../models/response/statistics/StatisticMonth';

Chart.register(...registerables);

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent implements OnInit{
  chart: Chart | null = null;

  statisticMonthYear?: StatisticMonthYear;
  statisticYear?: StatisticYear;
  statisticMonths?: StatisticMonths[] = [];

  currentDate = new Date();
  currentMonth = this.currentDate.getMonth() + 1; // Vì getMonth() trả về giá trị từ 0-11, nên cộng thêm 1
  currentYear = this.currentDate.getFullYear();

  isDisplay = false;

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
  selectedMonth: number = 0;
  selectedYear: number = 0;
  selectedYears: number = 0;


  constructor(private statisticService: StatisticsService){}

  ngOnInit(): void {
    this.years = this.generateYears(2020, new Date().getFullYear());
    this.getStatisticMonthYear(this.currentMonth, this.currentYear);
    this.getStatisticYear(2023);
    
  }

  getStatisticYear(year: number){
    this.statisticService.getStatisticYear(year).subscribe({
      next: (data) => {
        this.statisticYear = data;
        if (this.statisticYear) {
          console.log('statisticYear successfully:', this.statisticYear);
          this.renderChart();
        }
      },
      error: (err) => {
        console.error('Error statistic:', err.message);
      }
    });
  }

  getStatisticMonthYear(month: number, year: number){
    this.statisticService.getStatisticMonthYear(month, year).subscribe({
      next: (data) => {
        this.statisticMonthYear = data;
        if (this.statisticMonthYear) {
          console.log('Tour created successfully:', this.statisticMonthYear);
        }
      },
      error: (err) => {
        console.error('Error statistic:', err.message);
      }
    });
  }


  generateYears(start: number, end: number): number[] {
    const years = [];
    for (let year = start; year <= end; year++) {
      years.push(year);
    }
    return years;
  }

  filterTours() {
    if(this.selectedMonth == 0 || this.selectedYear == 0) {
      alert("Please select month and year");
      return;
    }
    this.getStatisticMonthYear(this.selectedMonth, this.selectedYear);
  }

  filterYears(){
    if(this.selectedYears==0){
      alert("Please select year");
      return;
    }
    console.log(this.selectedYears);
    this.getStatisticYear(this.selectedYears)
  }

  renderChart() {
    const ctx = (document.getElementById('worldwide-sales') as HTMLCanvasElement).getContext('2d');
    
    console.log("1", this.statisticYear); // Debug to check statisticYear
    
    // Check if statisticYear and statisticMonths are valid
    if (ctx !== null && this.statisticYear?.statisticMonths) {
      const statisticMonths = this.statisticYear.statisticMonths;
      
      // Destroy the previous chart instance if it exists
      if (this.chart) {
        this.chart.destroy();
      }
  
      // Map month labels from statisticMonths
      const labels = statisticMonths.map((monthData: StatisticMonths) => {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                        'July', 'August', 'September', 'October', 'November', 'December'];
        return months[monthData.month! - 1]; // Adjust index to match month number
      });
  
      // Map data for priceHotel, priceTourism, and priceTour
      const priceHotelData = statisticMonths.map((monthData: StatisticMonths) => monthData.priceHotel || 0);
      const priceTourismData = statisticMonths.map((monthData: StatisticMonths) => monthData.priceTourism || 0);
      const priceTourData = statisticMonths.map((monthData: StatisticMonths) => monthData.priceTour || 0);
  
      // Debug log for data
      console.log('priceHotelData:', priceHotelData);
      console.log('priceTourismData:', priceTourismData);
      console.log('priceTourData:', priceTourData);
  
      // Create the chart with Chart.js
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Price Hotel',
              data: priceHotelData,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
            {
              label: 'Price Tourism',
              data: priceTourismData,
              backgroundColor: 'rgba(153, 102, 255, 0.6)',
              borderColor: 'rgba(153, 102, 255, 1)',
              borderWidth: 1,
            },
            {
              label: 'Price Tour',
              data: priceTourData,
              backgroundColor: 'rgba(255, 159, 64, 0.6)',
              borderColor: 'rgba(255, 159, 64, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    } else {
      console.error("statisticYear or statisticMonths is invalid or data is missing.");
    }
  }
  
  
  
  

}
