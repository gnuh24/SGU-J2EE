import { Component, OnInit } from '@angular/core';
import { StationService } from '../../../services/station.service';
import { PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { StationUpdateFormComponent } from './station-update-form/station-update-form.component';
import { StationCreateFormComponent } from './station-create-form/station-create-form.component';

@Component({
    selector: 'app-station-management',
    templateUrl: './station-management.component.html',
    styleUrls: ['../admin-dashboard.scss'
        , './station-management.component.scss']
})
export class StationManagementComponent implements OnInit {
    stations: any[] = [];
    pageSize: number = 5;
    pageNumber: number = 1;
    totalElements: number = 0;
    totalPages: number = 0;
    search: string = '';
    status: string = '';
    sort: string = "id,asc";


    displayedColumns: string[] = ['id', 'name', 'address', 'coordinates', 'city', 'status', 'createdAt', 'updatedAt', 'actions'];

    constructor(private stationService: StationService, private dialog: MatDialog) { }

    openCreateStationDialog() {
        const dialogRef = this.dialog.open(StationCreateFormComponent);

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loadStations(); // Load lại nếu thêm thành công
            }
        });
    }

    updateStationInfo(station: any) {
        const dialogRef = this.dialog.open(StationUpdateFormComponent, {
            data: station
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loadStations(); // Load lại nếu cập nhật thành công
            }
        });
    }

    ngOnInit(): void {
        this.loadStations();
    }



    loadStations() {
        this.stationService.getStations(this.pageSize, this.pageNumber, this.sort, this.search, this.status).subscribe(
            (response) => {
                this.stations = response.data.content;
                this.totalElements = response.data.totalElements;
                this.totalPages = response.data.totalPages;
            },
            (error) => {
                console.error('Có lỗi khi gọi API Station: ', error);
            }
        );
    }

    onSortChange(sort: Sort): void {
        this.sort = `${sort.active},${sort.direction}`;
        this.pageNumber = 1;
        this.loadStations();
    }

    onPageChange(event: PageEvent) {
        this.pageNumber = event.pageIndex + 1;
        this.pageSize = event.pageSize;
        this.loadStations();
    }

    deleteStation(id: string) {
        this.stationService.deleteStation(id).subscribe(
            () => {
                this.stations = this.stations.filter(station => station.id !== id);
                this.loadStations();
            },
            (error) => console.error('Có lỗi khi xoá station: ', error)
        );
    }
}
