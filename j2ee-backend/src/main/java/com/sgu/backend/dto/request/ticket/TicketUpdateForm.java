package com.sgu.backend.dto.request.ticket;

import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class TicketUpdateForm {
		
		@Pattern(regexp = "BOOKED|CANCELLED|USED", message = "Trạng thái phải là BOOKED, CANCELLED hoặc USED")
		private String status;
}
