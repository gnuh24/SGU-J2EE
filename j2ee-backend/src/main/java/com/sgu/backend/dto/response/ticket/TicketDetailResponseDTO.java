package com.sgu.backend.dto.response.ticket;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sgu.backend.dto.response.coach.CoachResponseDTO;
import com.sgu.backend.dto.response.profile.ProfileDetailResponseDTO;
import com.sgu.backend.dto.response.route.RouteResponse;
import com.sgu.backend.dto.response.schedule.ScheduleResponseDTO;
import com.sgu.backend.dto.response.seat.SeatResponseDTO;
import com.sgu.backend.entities.Route;
import com.sgu.backend.entities.Seat;
import com.sgu.backend.entities.Ticket;
import lombok.Data;

@Data
public class TicketDetailResponseDTO {
		
		private String id;
		private Double price;
		private Ticket.TicketStatus status;
		private String createdAt;
		

		private SeatResponseDTO seat;
		private ScheduleResponseDTO schedule;
		
		@JsonProperty("profile")
		private ProfileDetailResponseDTO invoiceProfile;
		
		@JsonProperty("route")
		private RouteResponse scheduleRoute;
		
		@JsonProperty("coach")
		private CoachResponseDTO scheduleCoach;
		
}
