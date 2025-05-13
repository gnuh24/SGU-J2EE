package com.sgu.backend.dto.response.coach;

import com.sgu.backend.entities.Coach;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class CoachResponseDTO {
		
		@Schema(description = "ID của xe", example = "COACH12345")
		private String id;
		
		@Schema(description = "Biển số xe", example = "29A-12345")
		private String licensePlate;
	
		@Schema(description = "Sức chứa của xe", example = "40")
		private Integer capacity;
		
		@Schema(description = "Trạng thái của xe", example = "ACTIVE")
		private Coach.CoachStatus status;
		
		@Schema(description = "Thời gian tạo xe", example = "2023-05-10T12:00:00")
		private String createdAt;
		
		@Schema(description = "Thời gian cập nhật xe", example = "2023-06-10T12:00:00")
		private String updatedAt;
}
