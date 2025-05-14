import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import { RouteService } from '../../../../services/route.service';
import { RouteUpdateForm } from '../../../../models/route.response';
import { StationService } from '../../../../services/station.service';

@Component({
    selector: 'app-route-update-form',
    templateUrl: './route-update-form.component.html',
    styleUrls: ['../../admin-dialog.scss', './route-update-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class RouteUpdateFormComponent implements OnInit {
    routeForm: FormGroup;
    isSubmitting = false;
    stations: { id: string, name: string }[] = [];

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<RouteUpdateFormComponent>,
        private routeService: RouteService,
        private stationService: StationService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void {
        this.routeForm = this.fb.group({
            distance: [this.data.distance, Validators.required],
            duration: [this.data.duration, Validators.required],
            price: [this.data.price, Validators.required],
            departureStationId: [this.data.departureStation.id, Validators.required],
            arrivalStationId: [this.data.arrivalStation.id, Validators.required],
            status: [this.data.status, Validators.required]
        });

        this.stationService.getStationsNoPaging().subscribe({
            next: (res) => (this.stations = res.data.content),
            error: (err) => console.error('Lỗi khi lấy danh sách bến:', err)
        });
    }

    onSubmit(): void {
        if (this.routeForm.invalid) {
            return;
        }

        this.isSubmitting = true;
        const updatedRoute: RouteUpdateForm = {
            id: this.data.id,
            ...this.routeForm.value
        };

        this.routeService.updateRoute(updatedRoute.id, updatedRoute)
            .pipe(finalize(() => (this.isSubmitting = false)))
            .subscribe({
                next: () => this.dialogRef.close(true),
                error: err => console.error('Cập nhật tuyến đường thất bại:', err)
            });
    }

    onCancel(): void {
        this.dialogRef.close();
    }
}
