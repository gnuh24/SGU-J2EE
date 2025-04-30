import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../services/account.service';
import { PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-account-management',
    templateUrl: './account-management.component.html',
    styleUrls: ['../admin-dashboard.scss'
        , './account-management.component.scss']
})
export class AccountManagementComponent implements OnInit {
    accounts: any[] = [];
    pageSize: number = 5;
    pageNumber: number = 1;
    totalElements: number = 0;
    totalPages: number = 0;
    search: string = '';
    status: string = '';
    sort: string = 'id,asc';

    displayedColumns: string[] = ['id', 'email', 'role', 'createdAt', 'actions'];

    constructor(private accountService: AccountService) { }

    ngOnInit(): void {
        this.loadAccounts();
    }

    onSortChange(sort: Sort): void {
        this.sort = `${sort.active},${sort.direction}`;
        this.pageNumber = 1;
        this.loadAccounts();
    }


    loadAccounts(): void {
        this.accountService.getAccounts(this.pageSize, this.pageNumber, this.sort, this.search, this.status).subscribe(
            (response) => {
                this.accounts = response.data.content;
                this.totalElements = response.data.totalElements;
                this.totalPages = response.data.totalPages;
            },
            (error) => {
                console.error('Lỗi khi tải danh sách account:', error);
            }
        );
    }

    onPageChange(event: PageEvent): void {
        this.pageNumber = event.pageIndex + 1;
        this.pageSize = event.pageSize;
        this.loadAccounts();
    }

    onStatusChange(account: any, newStatus: 'ACTIVE' | 'INACTIVE' | 'BANNED'): void {
        const statusMap: { [key: string]: string } = {
            ACTIVE: 'Đang hoạt động',
            INACTIVE: 'Ngưng hoạt động',
            BANNED: 'Bị khóa'
        };

        Swal.fire({
            title: 'Xác nhận thay đổi',
            text: `Bạn có chắc muốn chuyển trạng thái tài khoản "${account.email}" sang "${statusMap[newStatus]}" không?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Đồng ý',
            cancelButtonText: 'Hủy'
        }).then((result) => {
            if (result.isConfirmed) {
                this.accountService.updateAccountStatus(account.id, newStatus).subscribe({
                    next: () => {
                        account.status = newStatus;
                        Swal.fire(
                            'Thành công!',
                            `Trạng thái của tài khoản "${account.email}" đã được cập nhật.`,
                            'success'
                        );
                    },
                    error: (err) => {
                        console.error('Lỗi cập nhật trạng thái:', err);
                        Swal.fire(
                            'Lỗi',
                            'Đã xảy ra lỗi khi cập nhật trạng thái. Vui lòng thử lại.',
                            'error'
                        );
                    }
                });
            }
        });
    }


}
