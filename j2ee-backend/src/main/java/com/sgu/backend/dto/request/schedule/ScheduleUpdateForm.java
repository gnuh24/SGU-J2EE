package com.sgu.backend.dto.request.schedule;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sgu.backend.entities.Schedule;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
public class ScheduleUpdateForm {
		@NotBlank(message = "Vui lòng chọn tuyến đường.")
		private String routeId;
		
		@NotBlank(message = "Vui lòng chọn xe khách.")
		private String coachId;
		
		@NotNull(message = "Vui lòng nhập thời gian khởi hành.")
		@JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
		private LocalDateTime departureTime;
		
		@NotNull(message = "Vui lòng chọn trạng thái.")
		private Schedule.Status status;
}
