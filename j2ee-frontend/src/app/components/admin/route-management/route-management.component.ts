import { Component, OnInit } from '@angular/core';
import { RouteService } from '../../../services/route.service';
import { PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { RouteCreateFormComponent } from './route-create-form/route-create-form.component';
import { RouteUpdateFormComponent } from './route-update-form/route-update-form.component';

@Component({
    selector: 'app-route-management',
    templateUrl: './route-management.component.html',
    styleUrls: ['../admin-dashboard.scss', './route-management.component.scss']
})
export class RouteManagementComponent implements OnInit {
    routes: any[] = [];
    pageSize: number = 5;
    pageNumber: number = 1;
    totalElements: number = 0;
    totalPages: number = 0;
    search: string = '';
    status: string = '';
    sort: string = 'id,asc';

    displayedColumns: string[] = [
        'id', 'departure', 'destination', 'distance',
        'duration', 'price', 'status', 'createdAt', 'updatedAt', 'actions'
    ];

    constructor(private routeService: RouteService, private dialog: MatDialog) { }

    ngOnInit(): void {
        this.loadRoutes();
    }

    loadRoutes() {
        this.routeService.getRoutes(this.pageSize, this.pageNumber, this.sort, this.search, this.status).subscribe(
            (response) => {
                this.routes = response.data.content;
                this.totalElements = response.data.totalElements;
                this.totalPages = response.data.totalPages;
            },
            (error) => console.error('Lỗi khi tải danh sách tuyến đường:', error)
        );
    }

    onPageChange(event: PageEvent) {
        this.pageNumber = event.pageIndex + 1;
        this.pageSize = event.pageSize;
        this.loadRoutes();
    }

    onSortChange(sort: Sort): void {
        this.sort = `${sort.active},${sort.direction}`;
        this.pageNumber = 1;
        this.loadRoutes();
    }

    openCreateRouteDialog() {
        const dialogRef = this.dialog.open(RouteCreateFormComponent);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loadRoutes();
            }
        });
    }

    updateRouteInfo(route: any) {
        const dialogRef = this.dialog.open(RouteUpdateFormComponent, { data: route });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loadRoutes();
            }
        });
    }
}
