package com.sgu.backend.controllers;

import com.sgu.backend.apiresponse.ApiResponse;
import com.sgu.backend.dto.response.invoice.InvoiceResponseDTO;
import com.sgu.backend.dto.response.seat.SeatDetailResponseDTO;
import com.sgu.backend.dto.response.seat.SeatResponseDTO;
import com.sgu.backend.entities.Seat;
import com.sgu.backend.entities.Ticket;
import com.sgu.backend.services.SeatService;
import com.sgu.backend.services.TicketService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

/**
 * SeatController handles the seat-related API requests, including retrieving,
 * creating, and updating seat information for buses.
 */
@RestController
@RequestMapping("/seats")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@Tag(name = "Seat API", description = "Quản lý ghế của xe khách")
public class SeatController {
		
		@Autowired
		private SeatService seatService;
		
		@Autowired
		private ModelMapper modelMapper;
		
		@Autowired
		private TicketService ticketService;
		
		/**
		 * Get the list of seats for a specific coach by its ID.
		 *
		 * @param id the ID of the coach for which to retrieve the seats
		 * @return a list of seat responses
		 */
		@Operation(summary = "Lấy thông tin ghế",
				description = "Lấy thông tin về các ghế của một xe khách cụ thể dựa trên ID của xe.")
		@GetMapping("/schedule/{id}")
		public ResponseEntity<ApiResponse<List<SeatDetailResponseDTO>>> getSeatById(@PathVariable String id) {
				List<Seat> entities = seatService.getByScheduleId(id);
				
				List<SeatDetailResponseDTO> dto = entities.stream()
						.map(
								(seat) -> (
										modelMapper.map(seat, SeatDetailResponseDTO.class)
								)
						).collect(Collectors.toList());
				
				List<Ticket> tickets = ticketService.getByScheduleId(id);
				
				tickets.stream()
						.filter(ticket -> ticket.getStatus().equals(Ticket.TicketStatus.BOOKED))  // Đóng ngoặc cho filter
						.forEach(ticket -> {  // forEach mở ngoặc nhọn
								dto.stream()
										.filter(seat -> ticket.getSeat().getId().equals(seat.getId()))
										.forEach(matchingSeat -> {
												// Thực hiện hành động khi ghế khớp
												matchingSeat.setStatus(SeatDetailResponseDTO.Status.BOOKED);
										});
						});


				return ResponseEntity.ok(new ApiResponse<>(200, "Lấy ghế thành công", dto));
		}
		
}
