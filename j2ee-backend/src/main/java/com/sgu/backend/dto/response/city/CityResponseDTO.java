package com.sgu.backend.dto.response.city;

import com.sgu.backend.entities.City;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class CityResponseDTO {
		
		@Schema(description = "ID của thành phố", example = "12345")
		private String id;
		
		@Schema(description = "Tên thành phố", example = "Hà Nội")
		private String name;
		
		@Schema(description = "Trạng thái của thành phố", example = "ACTIVE")
		private City.Status status;
		
		@Schema(description = "Thời gian tạo thành phố", example = "2023-05-10T12:00:00")
		private String createdAt;
		
		@Schema(description = "Thời gian cập nhật thành phố", example = "2025-05-10T12:00:00")
		private String updatedAt;
}
