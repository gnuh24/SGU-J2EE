import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { StatisticService } from '../../../services/statistic.service';
import { Chart } from 'chart.js';
import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'app-dashboard-summary',
    templateUrl: './statistic-management.component.html',
    styleUrls: ['../admin-dashboard.scss', './statistic-management.component.scss']
})
export class DashboardSummaryComponent implements OnInit, AfterViewInit {
    @ViewChild('chartCanvas') chartCanvas: ElementRef | undefined;
    summaryItems: {
        label: string;
        value: string | number;
        icon: string;
        color: string;
        key: string;
    }[] = [];

    private chart: Chart | undefined;

    constructor(
        private statisticService: StatisticService,
        @Inject(PLATFORM_ID) private platformId: Object,
        private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        this.statisticService.getGeneralStatistic().subscribe((res) => {
            const data = res.data;

            // Update summary items
            this.summaryItems = [
                {
                    key: 'newUsers',
                    label: 'Người dùng mới',
                    value: data.newUsers,
                    icon: 'person',
                    color: 'blue'
                },
                {
                    key: 'invoices',
                    label: 'Hóa đơn',
                    value: data.invoices,
                    icon: 'receipt',
                    color: 'orange'
                },
                {
                    key: 'tickets',
                    label: 'Vé đã bán',
                    value: data.tickets,
                    icon: 'confirmation_number',
                    color: 'green'
                },
                {
                    key: 'revenue',
                    label: 'Doanh thu',
                    value: this.formatCurrency(data.revenue),
                    icon: 'attach_money',
                    color: 'red'
                }
            ];
        });


    }

    ngAfterViewInit(): void {
        // Ensure the chart is rendered after the view is initialized
        if (isPlatformBrowser(this.platformId) && this.chartCanvas) {
            const ctx = (this.chartCanvas.nativeElement as HTMLCanvasElement).getContext('2d');
            if (ctx) {
                this.chart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: [],
                        datasets: [{
                            label: 'Doanh thu',
                            data: [],
                            fill: false,
                            borderColor: 'rgba(75,192,192,1)',
                            tension: 0.1
                        }]
                    },
                    options: {
                        responsive: true,
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: 'Ngày'
                                }
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: 'Doanh thu (VND)'
                                }
                            }
                        }
                    }
                });

                // Fetch data for the revenue chart
                this.statisticService.getDailyRevenuelStatistic().subscribe((res) => {
                    const chartData = res.data;
                    const labels = chartData.map((item: any) => {
                        const date = item.date;
                        return `${date[2]}/${date[1]}/${date[0]}`;
                    });
                    const data = chartData.map((item: any) => item.totalRevenue);

                    // Render chart only on client side
                    if (isPlatformBrowser(this.platformId)) {
                        // Use ChangeDetectorRef to ensure rendering is done in the view
                        this.cdr.detectChanges();
                        this.renderChart(labels, data);

                    }
                });
            }

        }
    }

    private renderChart(labels: string[], data: number[]): void {
        if (this.chart) {
            this.chart.data.labels = labels;
            this.chart.data.datasets[0].data = data;
            this.chart.update(); // Ensure chart is updated with new data
        }
    }

    private formatCurrency(value: number): string {
        return value.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND'
        });
    }
}
