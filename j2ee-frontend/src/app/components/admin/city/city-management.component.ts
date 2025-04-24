import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CityService } from '../../../services/city.service';
import { PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
    selector: 'app-city-management',
    templateUrl: './city-management.component.html',
    styleUrls: ['./city-management.component.css']
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

    constructor(private cityService: CityService) {}

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
        this.pageNumber = event.pageIndex;
        this.pageSize = event.pageSize;
        this.loadCities();
    }



    selectedCity: any = null; // Thành phố được chọn
    showUpdateForm: boolean = false; // Điều khiển việc hiển thị form


    updateCityInfo(city: any) {
        this.selectedCity = { ...city }; // Sao chép dữ liệu
        this.showUpdateForm = true; // Hiển thị form
      }
    
    onCityUpdated(city: any) {
        this.cityService.updateCity(city).subscribe(() => {
            this.loadCities(); // Load lại danh sách thành phố
            this.showUpdateForm = false; // Ẩn form sau khi cập nhật
        });
    }

    onCancelUpdate() {
        this.showUpdateForm = false; // Ẩn form khi hủy
    }
    addCity() {
        this.cityService.addCity(this.newCity).subscribe(
            (response) => {
                this.cities.push(response);
                this.newCity = {};
                this.loadCities();
            },
            (error) => console.error('Có lỗi khi thêm thành phố: ', error)
        );
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
