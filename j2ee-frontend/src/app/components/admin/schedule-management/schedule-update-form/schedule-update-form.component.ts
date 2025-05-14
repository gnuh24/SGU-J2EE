import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import { RouteService } from '../../../../services/route.service';
import { CoachService } from '../../../../services/coach.service';
import { ScheduleService } from '../../../../services/schedule.service';

@Component({
    selector: 'app-schedule-update-form',
    templateUrl: './schedule-update-form.component.html',
    styleUrls: ['../../admin-dialog.scss', './schedule-update-form.component.scss'],
})
export class ScheduleUpdateFormComponent implements OnInit {
    scheduleForm: FormGroup;
    routes: { id: string, departureStation: string, arrivalStation: string }[] = [];
    coaches: { id: string, licensePlate: string }[] = [];

    isSubmitting = false;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<ScheduleUpdateFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any, // 🟨 Nhận dữ liệu cần cập nhật từ ngoài vào
        private routeService: RouteService,
        private coachService: CoachService,
        private scheduleService: ScheduleService
    ) { }

    ngOnInit(): void {
        console.log('Dữ liệu lịch trình:', this.data); // 🟨 Kiểm tra dữ liệu đầu vào
        this.scheduleForm = this.fb.group({
            routeId: [this.data.route.id, Validators.required],
            coachId: ['', Validators.required],
            departureTime: [this.data.departureTime, Validators.required],
            status: [this.data.status, Validators.required],
        });

        this.loadRoutes();
        this.loadCoaches();
        this.populateForm(this.data); // 🟦 Gán dữ liệu ban đầu từ lịch trình
    }

    loadRoutes(): void {
        this.routeService.getRouteNoPaging().subscribe({
            next: (data) => {
                this.routes = data.data.map((route: any) => ({
                    id: route.id,
                    departureStation: route.departureStation.name,
                    arrivalStation: route.arrivalStation.name
                }));
            },
            error: (err) => console.error('Lỗi khi tải tuyến xe:', err)
        });
    }

    loadCoaches(): void {
        this.coachService.getCoachNoPaging().subscribe({
            next: (data) => {
                this.coaches = data.data.map((coach: any) => ({
                    id: coach.id,
                    licensePlate: coach.licensePlate
                }));
            },
            error: (err) => console.error('Lỗi khi tải xe khách:', err)
        });
    }

    populateForm(schedule: any): void {
        // ⚠️ Đảm bảo đúng định dạng `yyyy-MM-ddTHH:mm` cho `datetime-local`
        const formattedTime = new Date(schedule.departureTime).toISOString().slice(0, 16);
        this.scheduleForm.patchValue({
            routeId: schedule.route.id,
            coachId: schedule.coach.id,
            departureTime: formattedTime,
            status: schedule.status,
        });
    }

    onSubmit(): void {
        if (this.scheduleForm.invalid) return;

        this.isSubmitting = true;
        const updatedSchedule = { ...this.scheduleForm.value };

        this.scheduleService.updateSchedule(this.data.id, updatedSchedule)
            .pipe(finalize(() => this.isSubmitting = false))
            .subscribe({
                next: () => this.dialogRef.close(true),
                error: (err) => console.error('Cập nhật lịch trình thất bại:', err)
            });
    }

    onCancel(): void {
        this.dialogRef.close();
    }
}
