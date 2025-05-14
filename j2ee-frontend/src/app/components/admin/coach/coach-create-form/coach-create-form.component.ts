import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import { CoachService } from '../../../../services/coach.service';
import { CoachCreateForm } from '../../../../models/coach.response';

@Component({
    selector: 'app-coach-create-form',
    templateUrl: './coach-create-form.component.html',
    styleUrls: ['../../admin-dialog.scss', './coach-create-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CoachCreateFormComponent implements OnInit {
    coachForm: FormGroup;
    isSubmitting = false;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CoachCreateFormComponent>,
        private coachService: CoachService
    ) { }

    ngOnInit(): void {
        this.coachForm = this.fb.group({
            licensePlate: ['', Validators.required],
            status: ['ACTIVE', Validators.required]
        });
    }

    onSubmit(): void {
        if (this.coachForm.invalid) {
            return;
        }

        this.isSubmitting = true;
        const newCoach: CoachCreateForm = { ...this.coachForm.value };

        this.coachService.createCoach(newCoach)
            .pipe(finalize(() => (this.isSubmitting = false)))
            .subscribe({
                next: () => this.dialogRef.close(true),
                error: err => console.error('Tạo xe thất bại:', err)
            });
    }

    onCancel(): void {
        this.dialogRef.close();
    }
}
