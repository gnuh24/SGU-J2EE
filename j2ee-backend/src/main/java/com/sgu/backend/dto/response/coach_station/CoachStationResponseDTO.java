package com.sgu.backend.dto.response.coach_station;

import com.sgu.backend.dto.response.city.CityResponseDTO;
import com.sgu.backend.entities.CoachStation;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class CoachStationResponseDTO {
		
		@Schema(description = "ID của trạm xe", example = "COACHSTATION123")
		private String id;
		
		@Schema(description = "Tên trạm xe", example = "Trạm xe Bến Thành")
		private String name;
		
		@Schema(description = "Địa chỉ trạm xe", example = "Đường Lê Lợi, Quận 1, TP.HCM")
		private String address;
		
		@Schema(description = "Thời gian tạo trạm xe", example = "2023-05-10T12:00:00")
		private String createdAt;
		
		@Schema(description = "Thời gian cập nhật trạm xe", example = "2023-06-10T12:00:00")
		private String updatedAt;
		
		@Schema(description = "Kinh độ của trạm xe", example = "106.6969")
		private BigDecimal longitude;
		
		@Schema(description = "Vĩ độ của trạm xe", example = "10.7626")
		private BigDecimal latitude;
		
		@Schema(description = "Trạng thái của trạm xe", example = "ACTIVE")
		private CoachStation.Status status;
		
		@Schema(description = "Thông tin thành phố của trạm xe")
		private CityResponseDTO city;
}
