package com.sgu.backend.controllers;

import com.sgu.backend.apiresponse.ApiResponse;
import com.sgu.backend.dto.request.seat.SeatCreateForm;
import com.sgu.backend.dto.request.seat.SeatFilter;
import com.sgu.backend.dto.request.seat.SeatUpdateForm;
import com.sgu.backend.dto.response.seat.SeatResponseDTO;
import com.sgu.backend.entities.Seat;
import com.sgu.backend.services.SeatService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
		
		/**
		 * Get the list of seats for a specific coach by its ID.
		 *
		 * @param id the ID of the coach for which to retrieve the seats
		 * @return a list of seat responses
		 */
		@Operation(summary = "Lấy thông tin ghế",
				description = "Lấy thông tin về các ghế của một xe khách cụ thể dựa trên ID của xe.")
		@GetMapping("/{id}")
		public ResponseEntity<ApiResponse<List<SeatResponseDTO>>> getSeatById(@PathVariable String id) {
				List<SeatResponseDTO> dto = seatService.getById(id);
				
				return ResponseEntity.ok(new ApiResponse<>(200, "Lấy ghế thành công", dto));
		}
		
}
