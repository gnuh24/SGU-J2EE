package com.sgu.backend.dto.response.schedule;

import com.sgu.backend.dto.response.route.RouteResponse;
import com.sgu.backend.entities.Route;
import com.sgu.backend.entities.Schedule;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class ScheduleResponseDTO {
		
		@Schema(description = "ID của lịch trình", example = "SCHEDULE12345")
		private String id;
		
		@Schema(description = "Thông tin của tuyến đường")
		private RouteResponse route;
		
		@Schema(description = "Trạng thái của lịch trình", example = "SCHEDULE12345")
		private Schedule.Status status;
		
		@Schema(description = "Thời gian khởi hành", example = "2023-05-10T08:00:00")
		private String departureTime;
		
		@Schema(description = "Thời gian đến", example = "2023-05-10T10:00:00")
		private String arrivalTime;
		
		@Schema(description = "Thời gian tạo lịch trình", example = "2023-05-10T12:00:00")
		private String createdAt;
		
		@Schema(description = "Thời gian cập nhật lịch trình", example = "2023-06-10T12:00:00")
		private String updatedAt;
}
