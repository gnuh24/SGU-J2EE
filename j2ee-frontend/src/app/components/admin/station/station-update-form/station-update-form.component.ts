import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StationService } from '../../../../services/station.service';  // Dịch vụ StationService
import { CityService } from '../../../../services/city.service';  // Dịch vụ CityService
import { StationUpdateForm } from '../../../../models/station.response'; // Mô hình StationUpdateForm
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'app-station-update-form',
    templateUrl: './station-update-form.component.html',
    styleUrls: ['../../admin-dialog.scss',
        './station-update-form.component.scss']
})
export class StationUpdateFormComponent implements OnInit {
    stationForm: FormGroup;
    isSubmitting = false;
    cities: any[] = []; // Mảng để lưu danh sách thành phố từ API
    currentCityId: string; // Lưu giá trị cityId hiện tại của trạm

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<StationUpdateFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private stationService: StationService,  // Sử dụng dịch vụ StationService
        private cityService: CityService  // Sử dụng dịch vụ CityService
    ) { }

    ngOnInit(): void {
        // Lấy danh sách thành phố từ API
        this.getCities();

        this.stationForm = this.fb.group({
            name: [this.data?.name || '', Validators.required],  // Trường tên của trạm
            address: [this.data?.address || '', Validators.required],  // Địa chỉ của trạm
            longitude: [this.data?.longitude || '', [Validators.required, Validators.pattern(/^-?\d*(\.\d+)?$/)]],  // Kinh độ
            latitude: [this.data?.latitude || '', [Validators.required, Validators.pattern(/^-?\d*(\.\d+)?$/)]],  // Vĩ độ
            status: [this.data?.status || 'ACTIVE', Validators.required],  // Trạng thái trạm
            cityId: [this.data?.city.id || '', Validators.required]  // Thành phố liên quan đến trạm
        });
    }

    // Lấy danh sách các thành phố từ API (giả sử bạn có một API cung cấp danh sách thành phố)
    getCities(): void {
        this.cityService.getCitiesNoPaging().subscribe(
            (response) => {
                this.cities = response.data;
                this.currentCityId = this.data.city.id;  // Lưu cityId hiện tại của trạm

                this.stationForm.patchValue({
                    cityId: this.currentCityId
                });
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

        const updatedStation: StationUpdateForm = {
            ...this.stationForm.value
        };

        this.stationService.updateStation(this.data.id, updatedStation)
            .pipe(
                finalize(() => this.isSubmitting = false)
            )
            .subscribe({
                next: (response) => {
                    console.log('Cập nhật thành công:', response);
                    this.dialogRef.close(true);
                },
                error: (error) => {
                    console.error('Cập nhật thất bại:', error);
                }
            });
    }

    onCancel(): void {
        this.dialogRef.close();
    }
}
