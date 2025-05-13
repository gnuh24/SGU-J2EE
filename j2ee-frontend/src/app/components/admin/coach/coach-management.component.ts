import { Component, OnInit } from '@angular/core';
import { CoachService } from '../../../services/coach.service';
import { PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { CoachCreateFormComponent } from './coach-create-form/coach-create-form.component';
import { CoachUpdateFormComponent } from './coach-update-form/coach-update-form.component';

@Component({
    selector: 'app-coach-management',
    templateUrl: './coach-management.component.html',
    styleUrls: ['../admin-dashboard.scss', './coach-management.component.scss']
})
export class CoachManagementComponent implements OnInit {
    coaches: any[] = [];
    pageSize: number = 5;
    pageNumber: number = 1;
    totalElements: number = 0;
    totalPages: number = 0;
    search: string = '';
    status: string = '';
    sort: string = 'id,asc';

    displayedColumns: string[] = ['id', 'licensePlate', 'capacity', 'status', 'createdAt', 'updatedAt', 'actions'];

    constructor(private coachService: CoachService, private dialog: MatDialog) { }

    ngOnInit(): void {
        this.loadCoaches();
    }

    loadCoaches() {
        this.coachService.getCoaches(this.pageSize, this.pageNumber, this.sort, this.search, this.status).subscribe(
            (response) => {
                this.coaches = response.data.content;
                this.totalElements = response.data.totalElements;
                this.totalPages = response.data.totalPages;
            },
            (error) => console.error('Lỗi khi tải danh sách xe khách:', error)
        );
    }

    onPageChange(event: PageEvent) {
        this.pageNumber = event.pageIndex + 1;
        this.pageSize = event.pageSize;
        this.loadCoaches();
    }

    onSortChange(sort: Sort): void {
        this.sort = `${sort.active},${sort.direction}`;
        this.pageNumber = 1;
        this.loadCoaches();
    }

    openCreateCoachDialog() {
        const dialogRef = this.dialog.open(CoachCreateFormComponent);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loadCoaches();
            }
        });
    }

    updateCoachInfo(coach: any) {
        const dialogRef = this.dialog.open(CoachUpdateFormComponent, { data: coach });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loadCoaches();
            }
        });
    }

    // deleteCoach(id: string) {
    //     this.coachService.deleteCoach(id).subscribe(
    //         () => {
    //             this.coaches = this.coaches.filter(coach => coach.id !== id);
    //             this.loadCoaches();
    //         },
    //         (error) => console.error('Lỗi khi xoá xe khách:', error)
    //     );
    // }
}
