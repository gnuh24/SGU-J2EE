package com.sgu.backend.dto.response.route;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sgu.backend.dto.response.coach.CoachResponseDTO;
import com.sgu.backend.dto.response.coach_station.CoachStationResponseDTO;
import com.sgu.backend.entities.Route;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class RouteResponse {
		
		@Schema(description = "ID của tuyến đường", example = "ROUTE12345")
		private String id;
		
		@Schema(description = "Khoảng cách của tuyến đường", example = "100.5")
		private Double distance;
		
		@Schema(description = "Thời gian di chuyển của tuyến đường", example = "120.0")
		private Double duration;
		
		@Schema(description = "Giá vé của tuyến đường", example = "200000")
		private BigDecimal price;
		
		@Schema(description = "Thời gian tạo tuyến đường", example = "2023-05-10T12:00:00")
		private String createdAt;
		
		@Schema(description = "Thời gian cập nhật tuyến đường", example = "2023-06-10T12:00:00")
		private String updatedAt;
		
		@Schema(description = "Tên trạm xuất phát", example = "Trạm xe Bến Thành")
		private CoachStationResponseDTO departureStation;
		
		@Schema(description = "Tên trạm đến", example = "Trạm xe Mỹ Đình")
		private CoachStationResponseDTO arrivalStation;
		
		@Schema(description = "Trạng thái của tuyến đường", example = "ACTIVE")
		private Route.RouteStatus status;
}
