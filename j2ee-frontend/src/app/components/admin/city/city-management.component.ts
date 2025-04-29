import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CityService } from '../../../services/city.service';
import { PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { CityUpdateFormComponent } from './city-update-form/city-update-form.component';
import { CityCreateFormComponent } from './city-create-form/city-create-form.component';

@Component({
    selector: 'app-city-management',
    templateUrl: './city-management.component.html',
    styleUrls: ['./city-management.component.scss']
})
export class CityManagementComponent implements OnInit, AfterViewInit {
    cities: any[] = [];
    newCity: any = {};
    pageSize: number = 5;
    pageNumber: number = 1;
    totalElements: number = 0;
    totalPages: number = 0;
    search: string = '';
    status: string = '';
    sort: string = "id,asc";

    @ViewChild(MatSort) sortHeader!: MatSort;

    displayedColumns: string[] = ['id', 'name', 'status', 'createdAt', 'updatedAt', 'actions'];

    constructor(private cityService: CityService, private dialog: MatDialog) {}

    openCreateCityDialog() {
        const dialogRef = this.dialog.open(CityCreateFormComponent, {
          width: '400px',
          data: this.newCity
        });
      
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.loadCities(); // Nếu tạo thành công thì load lại danh sách
          }
        });
      }

    updateCityInfo(city: any) {
        const dialogRef = this.dialog.open(CityUpdateFormComponent, {
          width: '400px',
          data: city
        });
      
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.loadCities(); // Nếu cập nhật thành công thì load lại danh sách
          }
        });
      }
      
    ngOnInit(): void {
        this.loadCities();
    }

    ngAfterViewInit(): void {
        this.sortHeader.sortChange.subscribe((sort: Sort) => {
            console.log("Sort Header: ", this.sortHeader);
            console.log(sort);
            this.sort = `${sort.active},${sort.direction}`;
            this.pageNumber = 1;
            this.loadCities();
        });
    }

    loadCities() {
        this.cityService.getCities(this.pageSize, this.pageNumber, this.sort, this.search, this.status).subscribe(
            (response) => {
                this.cities = response.data.content;
                this.totalElements = response.data.totalElements;
                this.totalPages = response.data.totalPages;
            },
            (error) => {
                console.error('Có lỗi khi gọi API: ', error);
            }
        );
    }

    onPageChange(event: PageEvent) {
        this.pageNumber = event.pageIndex + 1;
        this.pageSize = event.pageSize;
        this.loadCities();
    }



    deleteCity(id: string) {
        this.cityService.deleteCity(id).subscribe(
            () => {
                this.cities = this.cities.filter(city => city.id !== id);
                this.loadCities();
            },
            (error) => console.error('Có lỗi khi xoá thành phố: ', error)
        );
    }
}
