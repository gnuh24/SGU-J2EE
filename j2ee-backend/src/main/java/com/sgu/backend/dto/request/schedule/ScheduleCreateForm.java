package com.sgu.backend.dto.request.schedule;

import com.sgu.backend.entities.Schedule;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalTime;

@Data
public class ScheduleCreateForm {
    @NotBlank
    private String routeId;

    @NotNull
    private LocalTime departureTime;

    @NotNull
    private LocalTime arrivalTime;

    @NotNull
    private Schedule.Status status;
}
