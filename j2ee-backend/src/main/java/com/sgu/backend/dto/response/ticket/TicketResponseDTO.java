package com.sgu.backend.dto.response.ticket;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sgu.backend.entities.Ticket;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class TicketResponseDTO {
		
		@Schema(description = "ID của vé", example = "TICKET12345")
		private String id;
		
		@JsonProperty("departure")
		@Schema(description = "Tên trạm xuất phát trong lịch trình", example = "Trạm xe Bến Thành")
		private String scheduleRouteDepartureStationName;
		
		@JsonProperty("arrival")
		@Schema(description = "Tên trạm đến trong lịch trình", example = "Trạm xe Mỹ Đình")
		private String scheduleRouteArrivalStationName;
		
//		@JsonProperty("fullname")
//		@Schema(description = "Tên người mua vé", example = "Nguyễn Văn A")
//		private String invoiceProfileFullname;
//
//		@JsonProperty("phone")
//		@Schema(description = "Số điện thoại của người mua vé", example = "0912345678")
//		private String invoiceProfilePhone;
		
		@Schema(description = "Giá vé", example = "200000")
		private Double price;
		
		@Schema(description = "Trạng thái của vé", example = "BOOKED")
		private Ticket.TicketStatus status;
		
		@Schema(description = "Thời gian tạo vé", example = "2023-05-10T12:00:00")
		private String createdAt;
}
