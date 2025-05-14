import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import { RouteService } from '../../../../services/route.service';
import { StationService } from '../../../../services/station.service';

@Component({
    selector: 'app-route-create-form',
    templateUrl: './route-create-form.component.html',
    styleUrls: ['../../admin-dialog.scss', './route-create-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class RouteCreateFormComponent implements OnInit {
    routeForm: FormGroup;
    isSubmitting = false;
    stations: { id: string, name: string }[] = [];

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<RouteCreateFormComponent>,
        private routeService: RouteService,
        private stationService: StationService
    ) { }

    ngOnInit(): void {
        this.routeForm = this.fb.group({
            distance: [0, [Validators.required, Validators.min(1)]],
            duration: [0, [Validators.required, Validators.min(1)]],
            price: [0, [Validators.required, Validators.min(0)]],
            departureStationId: ['', Validators.required],
            arrivalStationId: ['', Validators.required],
            status: ['ACTIVE', Validators.required]
        });

        this.stationService.getStationsNoPaging().subscribe({
            next: (res) => (this.stations = res.data.content),
            error: (err) => console.error('Lỗi khi lấy danh sách bến:', err)
        });
    }

    onSubmit(): void {
        if (this.routeForm.invalid) return;

        this.isSubmitting = true;
        const newRoute = { ...this.routeForm.value };

        this.routeService.createRoute(newRoute)
            .pipe(finalize(() => (this.isSubmitting = false)))
            .subscribe({
                next: () => this.dialogRef.close(true),
                error: err => console.error('Tạo tuyến đường thất bại:', err)
            });
    }

    onCancel(): void {
        this.dialogRef.close();
    }
}
