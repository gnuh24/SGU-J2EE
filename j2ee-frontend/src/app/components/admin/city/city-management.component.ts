import { Component, OnInit } from '@angular/core';
import { CityService } from '../../../services/city.service';  // Import CityService

@Component({
    selector: 'app-city-management',
    templateUrl: './city-management.component.html',
    styleUrls: ['./city-management.component.css']
})
export class CityManagementComponent implements OnInit {
    cities: any[] = [];
    newCity: any = {};
    pageSize: number = 2; // Số lượng thành phố mỗi trang
    pageNumber: number = 1; // Số trang hiện tại
    totalElements: number = 0; // Tổng số thành phố
    totalPages: number = 0; // Tổng số trang
    search: string = ''; // Từ khoá tìm kiếm
    status: string = ''; // Trạng thái lọc (ACTIVE / INACTIVE)

    constructor(private cityService: CityService) { }

    ngOnInit(): void {
        this.loadCities();  // Load danh sách thành phố khi component khởi tạo
    }

    // Phương thức load lại danh sách thành phố với các tham số phân trang và tìm kiếm
    loadCities() {
        this.cityService.getCities(this.pageSize, this.pageNumber, 'id,asc', this.search, this.status).subscribe(
            (response) => {
                this.cities = response.data.content;  // Dữ liệu thành phố từ API
                this.totalElements = response.data.totalElements;
                this.totalPages = response.data.totalPages;
            },
            (error) => {
                console.error('Có lỗi khi gọi API: ', error);
            }
        );
    }

    // Phương thức gọi lại API khi thay đổi trang
    goToPage(pageNumber: number) {
        this.pageNumber = pageNumber;
        this.loadCities();
    }

    updateCityInfo(city: any) {
        const updatedCity = {
            name: 'Mũi né mớiii',
            status: 'ACTIVE'
        };
    
        this.cityService.updateCity({ ...city, ...updatedCity }).subscribe(
            () => {
                this.loadCities(); // Reload lại danh sách sau khi cập nhật
            },
            (error) => {
                console.error('Có lỗi khi cập nhật thành phố: ', error);
            }
        );
    }
    

    // Thêm thành phố mới
    addCity() {
        this.cityService.addCity(this.newCity).subscribe(
            (response) => {
                this.cities.push(response);  // Thêm thành phố mới vào danh sách
                this.newCity = {};  // Reset form
                this.loadCities();  // Reload lại danh sách thành phố
            },
            (error) => {
                console.error('Có lỗi khi thêm thành phố: ', error);
            }
        );
    }

    // Xoá thành phố
    deleteCity(id: string) {
        this.cityService.deleteCity(id).subscribe(
            () => {
                this.cities = this.cities.filter(city => city.id !== id);  // Xoá thành phố khỏi danh sách
                this.loadCities();  // Reload lại danh sách thành phố
            },
            (error) => {
                console.error('Có lỗi khi xoá thành phố: ', error);
            }
        );
    }
}
