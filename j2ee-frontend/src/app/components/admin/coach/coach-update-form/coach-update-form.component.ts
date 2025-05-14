import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import { CoachService } from '../../../../services/coach.service';

@Component({
    selector: 'app-coach-update-form',
    templateUrl: './coach-update-form.component.html',
    styleUrls: ['../../admin-dialog.scss', './coach-update-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CoachUpdateFormComponent implements OnInit {
    coachForm: FormGroup;
    isSubmitting = false;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CoachUpdateFormComponent>,
        private coachService: CoachService,
        @Inject(MAT_DIALOG_DATA) public data: any // Dữ liệu xe được truyền vào khi mở dialog
    ) { }

    ngOnInit(): void {
        this.coachForm = this.fb.group({
            licensePlate: [this.data.licensePlate, Validators.required],
            status: [this.data.status, Validators.required]
        });
    }

    onSubmit(): void {
        if (this.coachForm.invalid) {
            return;
        }

        this.isSubmitting = true;
        const updatedCoach = { ...this.coachForm.value };

        this.coachService.updateCoach(this.data.id, updatedCoach)
            .pipe(finalize(() => (this.isSubmitting = false)))
            .subscribe({
                next: () => this.dialogRef.close(true),
                error: err => console.error('Cập nhật xe thất bại:', err)
            });
    }

    onCancel(): void {
        this.dialogRef.close();
    }
}
