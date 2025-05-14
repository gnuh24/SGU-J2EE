import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../../../services/schedule.service';
import { PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ScheduleCreateFormComponent } from './schedule-create-form/schedule-create-form.component';
import { ScheduleUpdateFormComponent } from './schedule-update-form/schedule-update-form.component';
@Component({
    selector: 'app-schedule-management',
    templateUrl: './schedule-management.component.html',
    styleUrls: ['../admin-dashboard.scss',
        './schedule-management.component.scss']
})
export class ScheduleManagementComponent implements OnInit {
    schedules: any[] = [];
    totalElements = 0;
    pageSize = 5;
    pageNumber = 0;
    search = '';
    status = '';
    sort: string = 'id,asc';
    displayedColumns: string[] = [
        'id',
        'status',
        'departureTime',
        'createdAt',
        'updatedAt',
        'actions'
    ];

    constructor(private scheduleService: ScheduleService, private dialog: MatDialog) { }

    ngOnInit(): void {
        this.loadSchedules();
    }

    loadSchedules(): void {
        const params = {
            page: this.pageNumber,
            size: this.pageSize,
            search: this.search,
            status: this.status
        };
        this.scheduleService.getSchedules(this.pageSize, this.pageNumber, this.sort, this.search, this.status).subscribe((res: any) => {
            this.schedules = res.data.content;
            this.totalElements = res.data.totalElements;
        });
    }

    onPageChange(event: PageEvent): void {
        this.pageSize = event.pageSize;
        this.pageNumber = event.pageIndex + 1;
        this.loadSchedules();
    }

    onSortChange(sort: Sort): void {
        this.sort = `${sort.active},${sort.direction}`;
        this.pageNumber = 1;
        this.loadSchedules();
    }

    openCreateScheduleDialog(): void {
        const dialogRef = this.dialog.open(ScheduleCreateFormComponent);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loadSchedules();
            }
        });
    }

    openUpdateScheduleDialog(schedule: any): void {
        const dialogRef = this.dialog.open(ScheduleUpdateFormComponent, { data: schedule });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loadSchedules();
            }
        });
    }
}
