package com.sgu.backend.dto.response.schedule;

import com.sgu.backend.entities.Schedule;
import lombok.Data;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
public class ScheduleResponseDTO {
    private String id;
    private String routeId;
    private LocalTime departureTime;
    private LocalTime arrivalTime;
    private Schedule.Status status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
