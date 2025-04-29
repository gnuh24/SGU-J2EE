import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CityService } from '../../../../services/city.service';
import { CityCreateForm } from '../../../../models/city.response';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'app-city-create-form',
    templateUrl: './city-create-form.component.html',
    styleUrls: ['./city-create-form.component.scss'],
    encapsulation: ViewEncapsulation.None // Không sử dụng encapsulation

})
export class CityCreateFormComponent implements OnInit {
    cityForm: FormGroup;
    isSubmitting = false;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CityCreateFormComponent>,
        private cityService: CityService
    ) {}

    ngOnInit(): void {
        this.cityForm = this.fb.group({
            name: ['', Validators.required],
            status: ['ACTIVE', Validators.required]
        });
    }

    onSubmit(): void {
        if (this.cityForm.invalid) {
            return;
        }

        this.isSubmitting = true;

        const newCity: CityCreateForm = {
            ...this.cityForm.value
        };

        this.cityService.createCity(newCity)
            .pipe(
                finalize(() => this.isSubmitting = false)
            )
            .subscribe({
                next: (response) => {
                    console.log('Tạo thành phố thành công:', response);
                    this.dialogRef.close(true);
                },
                error: (error) => {
                    console.error('Tạo thành phố thất bại:', error);
                }
            });
    }

    onCancel(): void {
        this.dialogRef.close();
    }
}
