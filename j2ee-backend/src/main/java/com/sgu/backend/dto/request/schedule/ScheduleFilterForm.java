package com.sgu.backend.dto.request.schedule;

import com.sgu.backend.entities.Schedule;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Data
public class ScheduleFilterForm {
    private String search;
    private Schedule.Status status;
	
	
	// USER
	private String startCityId;
	private String endCityId;
	
	private LocalDate departureTime;
	private LocalDateTime now;
}
