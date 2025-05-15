package com.sgu.backend.dto.response.seat;

import com.sgu.backend.entities.Seat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class SeatDetailResponseDTO {
		@Schema(description = "ID của ghế", example = "SEAT12345")
		private String id;
		
		@Schema(description = "Số hiệu ghế", example = "10")
		private Integer number;
		
		@Schema(description = "Trạng thái hiện tại của ghế", example = "BOOKED")
		private Status status = Status.AVALIABLE;
		
		public static enum Status{
				AVALIABLE,
				BOOKED
		}
}
