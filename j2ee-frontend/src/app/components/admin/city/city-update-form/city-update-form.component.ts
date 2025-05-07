import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CityService } from '../../../../services/city.service';
import { CityUpdateForm } from '../../../../models/city.response';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'app-city-update-form',
    templateUrl: './city-update-form.component.html',
    styleUrls: ['../../admin-dialog.scss',
        './city-update-form.component.scss']
})
export class CityUpdateFormComponent implements OnInit {
    cityForm: FormGroup;
    isSubmitting = false;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CityUpdateFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private cityService: CityService
    ) { }

    ngOnInit(): void {
        this.cityForm = this.fb.group({
            name: [this.data?.name || '', Validators.required],
            status: [this.data?.status || 'ACTIVE', Validators.required],
        });
    }

    onSubmit(): void {
        if (this.cityForm.invalid) {
            return;
        }

        this.isSubmitting = true;

        const updatedCity: CityUpdateForm = {
            ...this.cityForm.value
        };

        this.cityService.updateCity(this.data.id, updatedCity)
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
