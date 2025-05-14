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
		
		@Schema(description = "ID của xe", example = "COACH12345")
		private String coachId;
		
}
