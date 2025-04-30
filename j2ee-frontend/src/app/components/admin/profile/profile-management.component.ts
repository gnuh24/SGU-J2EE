import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';

@Component({
    selector: 'app-profile-management',
    templateUrl: './profile-management.component.html',
    styleUrls: ['../admin-dashboard.scss', './profile-management.component.scss']
})
export class ProfileManagementComponent implements OnInit {
    profiles: any[] = [];
    pageSize: number = 5;
    pageNumber: number = 1;
    totalElements: number = 0;
    totalPages: number = 0;
    search: string = '';
    sort: string = 'id,asc';

    displayedColumns: string[] = ['id', 'fullname', 'email', 'phone', 'actions'];

    constructor(private profileService: ProfileService) { }

    ngOnInit(): void {
        this.loadProfiles();
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

    onSortChange(sort: Sort): void {
        console.log('Sort changed:', sort);
        this.sort = `${sort.active},${sort.direction}`;
        this.pageNumber = 1;
        this.loadProfiles();
    }
}
