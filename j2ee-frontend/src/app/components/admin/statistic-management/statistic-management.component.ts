import { Component, OnInit } from '@angular/core';
import { StatisticService } from '../../../services/statistic.service';

@Component({
    selector: 'app-dashboard-summary',
    templateUrl: './statistic-management.component.html',
    styleUrls: ['../admin-dashboard.scss', './statistic-management.component.scss']
})
export class DashboardSummaryComponent implements OnInit {
    summaryItems: {
        label: string;
        value: string | number;
        icon: string;
        color: string;
        key: string;
    }[] = [];

    constructor(private statisticService: StatisticService) { }

    ngOnInit(): void {
        this.statisticService.getGeneralStatistic().subscribe(res => {
            const data = res.data;
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

    private formatCurrency(value: number): string {
        return value.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND'
        });
    }
}
