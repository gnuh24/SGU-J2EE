package com.sgu.backend.dto.response.ticket;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sgu.backend.entities.Ticket;
import lombok.Data;

@Data
public class TicketResponseDTO {
    private String id;
	
	@JsonProperty("departure")
    private String scheduleRouteDepartureStationName;
	
	@JsonProperty("arrival")
		private String scheduleRouteArrivalStationName;
	
	@JsonProperty("fullname")
		private String invoiceProfileFullname;
		
		@JsonProperty("phone")
		private String invoiceProfilePhone;
		
		private Double price;
    private Ticket.TicketStatus status;
	private String createdAt;
}
