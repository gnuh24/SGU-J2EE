package com.sgu.backend.controllers;

import com.sgu.backend.apiresponse.ApiResponse;
import com.sgu.backend.dto.request.ticket.TicketCreateForm;
import com.sgu.backend.dto.request.ticket.TicketFilter;
import com.sgu.backend.dto.request.ticket.TicketUpdateForm;
import com.sgu.backend.dto.response.ticket.TicketDetailResponseDTO;
import com.sgu.backend.dto.response.ticket.TicketResponseDTO;
import com.sgu.backend.services.TicketService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tickets")
@CrossOrigin(origins = "*")
@Tag(name = "Ticket API", description = "Quản lý vé xe")
public class TicketController {
		
		@Autowired
		private TicketService ticketService;
		
		@Autowired
		private ModelMapper modelMapper;
		
		/**
		 * Lấy danh sách vé theo trang và filter
		 */
		@Operation(summary = "Lấy danh sách vé", description = "Trả về danh sách các vé xe dựa trên phân trang và bộ lọc.")
		@GetMapping
		public ResponseEntity<ApiResponse<Page<TicketResponseDTO>>> getAll(
				@Parameter(description = "Thông tin phân trang và bộ lọc cho vé")
				Pageable pageable,
				@Parameter(description = "Bộ lọc cho vé")
				TicketFilter filter) {
				
				return ResponseEntity.ok(new ApiResponse<>(200, "Danh sách vé", ticketService.getAll(pageable, filter)));
		}
		
		/**
		 * Lấy vé theo ID
		 */
		@Operation(summary = "Lấy vé theo ID", description = "Trả về chi tiết vé theo ID của vé.")
		@GetMapping("/{id}")
		public ResponseEntity<ApiResponse<TicketDetailResponseDTO>> getById(@PathVariable String id) {
				TicketDetailResponseDTO ticket = modelMapper.map(ticketService.getById(id), TicketDetailResponseDTO.class );
				return ResponseEntity.ok(new ApiResponse<>(200, "Chi tiết vé", ticket));
		}
		
//		/**
//		 * Tạo vé
//		 */
//		@Operation(summary = "Tạo vé", description = "Tạo một vé mới.")
//		@PostMapping
//		public ResponseEntity<ApiResponse<TicketResponseDTO>> create(@RequestBody @Valid TicketCreateForm form) {
//				return ResponseEntity.ok(new ApiResponse<>(201, "Tạo vé thành công", ticketService.create(form)));
//		}
		
		/**
		 * Cập nhật trạng thái vé
		 */
		@Operation(summary = "Cập nhật trạng thái vé", description = "Cập nhật trạng thái của vé theo ID.")
		@PutMapping("/{id}/status")
		public ResponseEntity<ApiResponse<TicketResponseDTO>> update(
				@Parameter(description = "ID của vé cần cập nhật trạng thái")
				@PathVariable String id,
				@RequestBody @Valid TicketUpdateForm form) {
				
				return ResponseEntity.ok(new ApiResponse<>(200, "Cập nhật vé thành công", ticketService.update(id, form)));
		}
}
