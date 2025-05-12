package com.sgu.backend.dto.response.seat;

import com.sgu.backend.entities.Seat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class SeatResponseDTO {
		
		@Schema(description = "ID của ghế", example = "SEAT12345")
		private String id;
		
		@Schema(description = "Số hiệu ghế", example = "10")
		private Integer number;
		
		@Schema(description = "Loại ghế", example = "WINDOW")
		private Seat.SeatType type;
		
		@Schema(description = "Ghế có cạnh cửa sổ không", example = "true")
		private Boolean isNextToWindow;
		
		@Schema(description = "Tầng của ghế", example = "1")
		private Integer floor;
		
		@Schema(description = "ID của xe", example = "COACH12345")
		private String coachId;
		
		@Schema(description = "Biển số xe", example = "29A-12345")
		private String coachLicensePlate; // bổ sung nếu muốn hiển thị thông tin coach
}
