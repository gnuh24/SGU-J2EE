import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { StationService } from '../../../../services/station.service';  // Dịch vụ StationService
import { CityService } from '../../../../services/city.service';  // Dịch vụ CityService
import { StationCreateForm } from '../../../../models/station.response'; // Mô hình StationCreateForm
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'app-station-create-form',
    templateUrl: './station-create-form.component.html',
    styleUrls: ['./station-create-form.component.scss']
})
export class StationCreateFormComponent implements OnInit {
    stationForm: FormGroup;
    isSubmitting = false;
    cities: any[] = []; // Mảng để lưu danh sách thành phố từ API

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<StationCreateFormComponent>,
        private stationService: StationService,  // Dịch vụ StationService
        private cityService: CityService  // Dịch vụ CityService
    ) {}

    ngOnInit(): void {
        // Lấy danh sách thành phố từ API
        this.getCities();

        this.stationForm = this.fb.group({
            name: ['', Validators.required],  // Trường tên của trạm
            address: ['', Validators.required],  // Địa chỉ của trạm
            longitude: ['', [Validators.required, Validators.pattern(/^-?\d*(\.\d+)?$/)]],  // Kinh độ
            latitude: ['', [Validators.required, Validators.pattern(/^-?\d*(\.\d+)?$/)]],  // Vĩ độ
            status: ['ACTIVE', Validators.required],  // Trạng thái trạm
            cityId: ['', Validators.required]  // Thành phố liên quan đến trạm
        });
    }

    // Lấy danh sách các thành phố từ API (giả sử bạn có một API cung cấp danh sách thành phố)
    getCities(): void {
        this.cityService.getCitiesNoPaging().subscribe(
            (response) => {
                this.cities = response.data; // Lưu danh sách thành phố vào mảng cities
            },
            (error) => {
                console.error('Lỗi khi lấy danh sách thành phố:', error);  // Xử lý lỗi nếu có      
            }
        );
    }

    onSubmit(): void {
        if (this.stationForm.invalid) {
            return;
        }

        this.isSubmitting = true;

        const newStation: StationCreateForm = {
            ...this.stationForm.value
        };

        this.stationService.createStation(newStation)
            .pipe(
                finalize(() => this.isSubmitting = false)
            )
            .subscribe({
                next: (response) => {
                    console.log('Tạo mới thành công:', response);
                    this.dialogRef.close(true);
                },
                error: (error) => {
                    console.error('Tạo mới thất bại:', error);
                }
            });
    }

    onCancel(): void {
        this.dialogRef.close();
    }
}
