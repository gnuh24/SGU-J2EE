import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ProfileService } from '../../../services/profile.service'; // Sử dụng ProfileService thay cho AccountService
import { PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-profile-management',
    templateUrl: './profile-management.component.html',
    styleUrls: ['../admin-dashboard.scss', './profile-management.component.scss']
})
export class ProfileManagementComponent implements OnInit, AfterViewInit {
    profiles: any[] = [];
    pageSize: number = 5;
    pageNumber: number = 1;
    totalElements: number = 0;
    totalPages: number = 0;
    search: string = '';
    status: string = ''; // Trạng thái có thể thay đổi trong trường hợp profile có trạng thái
    sort: string = 'id,asc';

    @ViewChild(MatSort) sortHeader!: MatSort;

    displayedColumns: string[] = ['id', 'fullname', 'email', 'phone', 'actions'];

    constructor(private profileService: ProfileService) { }

    ngOnInit(): void {
        this.loadProfiles();
    }

    ngAfterViewInit(): void {
        this.sortHeader.sortChange.subscribe((sort: Sort) => {
            this.sort = `${sort.active},${sort.direction}`;
            this.pageNumber = 1;
            this.loadProfiles();
        });
    }

    loadProfiles(): void {
        this.profileService.getProfiles(this.pageSize, this.pageNumber, this.search, this.sort).subscribe(
            (response) => {
                this.profiles = response.data.content;
                this.totalElements = response.data.totalElements;
                this.totalPages = response.data.totalPages;
            },
            (error) => {
                console.error('Lỗi khi tải danh sách profile:', error);
            }
        );
    }

    onPageChange(event: PageEvent): void {
        this.pageNumber = event.pageIndex + 1;
        this.pageSize = event.pageSize;
        this.loadProfiles();
    }
}
