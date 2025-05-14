import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import { RouteService } from '../../../../services/route.service'; // Import RouteService
import { ScheduleService } from '../../../../services/schedule.service'; // Import ScheduleService
import { CoachService } from '../../../../services/coach.service'; // Import CoachService
@Component({
    selector: 'app-schedule-create-form',
    templateUrl: './schedule-create-form.component.html',
    styleUrls: ['../../admin-dialog.scss', './schedule-create-form.component.scss'],
})
export class ScheduleCreateFormComponent implements OnInit {
    scheduleForm: FormGroup;
    routes: { id: string, departureStation: string, arrivalStation: string }[] = [];
    coaches: { id: string, licensePlate: string }[] = [];

    isSubmitting = false;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<ScheduleCreateFormComponent>,
        private routeService: RouteService, // Inject RouteService
        private coachService: CoachService, // Inject CoachService
        private scheduleService: ScheduleService // Inject ScheduleService
    ) { }

    ngOnInit(): void {
        this.scheduleForm = this.fb.group({
            routeId: ['', Validators.required],
            coachId: ['', Validators.required], // 🚍 Thêm trường này
            departureTime: ['', Validators.required],
            status: ['ACTIVE', Validators.required],
        });


        // Lấy dữ liệu tuyến xe từ API
        this.loadRoutes();
        this.loadCoaches();
    }

    loadRoutes(): void {
        this.routeService.getRouteNoPaging().subscribe(
            (data) => {
                // Chuyển đổi dữ liệu trả về từ API thành định dạng mà bạn mong muốn
                this.routes = data.data.map((route: any) => ({
                    id: route.id,  // Đảm bảo rằng dữ liệu có trường id
                    departureStation: route.departureStation.name,
                    arrivalStation: route.arrivalStation.name
                }));
                console.log('Danh sách tuyến xe:', this.routes);
            },
            (error) => {
                console.error('Lỗi khi lấy tuyến xe:', error);
            }
        );
    }

    loadCoaches(): void {
        this.coachService.getCoachNoPaging().subscribe(
            (data) => {
                this.coaches = data.data.map((coach: any) => ({
                    id: coach.id,
                    licensePlate: coach.licensePlate
                }));
            },
            (error) => {
                console.error('Lỗi khi lấy danh sách xe khách:', error);
            }
        );
    }




    // Hàm xử lý khi submit form
    onSubmit(): void {
        if (this.scheduleForm.invalid) {
            return;
        }

        this.isSubmitting = true;
        const newSchedule = { ...this.scheduleForm.value };


        this.scheduleService.createSchedule(newSchedule).pipe(finalize(() => (this.isSubmitting = false)))
            .subscribe({
                next: () => this.dialogRef.close(true),
                error: (err) => console.error('Tạo lịch trình thất bại:', err)
            });
    }

    // Hàm hủy
    onCancel(): void {
        this.dialogRef.close();
    }
}
