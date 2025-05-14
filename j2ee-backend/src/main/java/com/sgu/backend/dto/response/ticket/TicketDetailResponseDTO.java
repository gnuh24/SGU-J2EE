package com.sgu.backend.dto.response.ticket;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sgu.backend.dto.response.coach.CoachResponseDTO;
import com.sgu.backend.dto.response.profile.ProfileDetailResponseDTO;
import com.sgu.backend.dto.response.route.RouteResponse;
import com.sgu.backend.dto.response.schedule.ScheduleResponseDTO;
import com.sgu.backend.dto.response.seat.SeatResponseDTO;
import com.sgu.backend.entities.Ticket;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class TicketDetailResponseDTO {
		
		@Schema(description = "ID của vé", example = "TICKET12345")
		private String id;
		
		@Schema(description = "Giá vé", example = "200000")
		private Double price;
		
		@Schema(description = "Trạng thái của vé", example = "BOOKED")
		private Ticket.TicketStatus status;
		
		@Schema(description = "Thời gian tạo vé", example = "2023-05-10T12:00:00")
		private String createdAt;
		
		@Schema(description = "Thông tin về ghế", implementation = SeatResponseDTO.class)
		private SeatResponseDTO seat;
		
		@Schema(description = "Thông tin về lịch trình", implementation = ScheduleResponseDTO.class)
		private ScheduleResponseDTO schedule;
		
		@JsonProperty("profile")
		@Schema(description = "Thông tin khách hàng (người mua vé)", implementation = ProfileDetailResponseDTO.class)
		private ProfileDetailResponseDTO invoiceProfile;
		
		@JsonProperty("route")
		@Schema(description = "Thông tin về tuyến đường", implementation = RouteResponse.class)
		private RouteResponse scheduleRoute;
		
		@JsonProperty("coach")
		@Schema(description = "Thông tin về xe", implementation = CoachResponseDTO.class)
		private CoachResponseDTO scheduleCoach;
}
