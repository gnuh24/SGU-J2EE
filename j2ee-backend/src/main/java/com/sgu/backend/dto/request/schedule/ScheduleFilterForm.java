package com.sgu.backend.dto.request.schedule;

import com.sgu.backend.entities.Schedule;
import lombok.Data;

@Data
public class ScheduleFilterForm {
    private String search;
    private Schedule.Status status;
}
