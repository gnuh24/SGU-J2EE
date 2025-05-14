package com.sgu.backend.controllers;

import com.sgu.backend.apiresponse.ApiResponse;
import com.sgu.backend.dto.request.coach.CoachCreateForm;
import com.sgu.backend.dto.request.coach.CoachFilter;
import com.sgu.backend.dto.request.coach.CoachUpdateForm;
import com.sgu.backend.dto.response.coach.CoachResponseDTO;
import com.sgu.backend.dto.response.seat.SeatResponseDTO;
import com.sgu.backend.entities.Coach;
import com.sgu.backend.services.CoachService;
import com.sgu.backend.services.SeatService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
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

@RestController
@RequestMapping("/coaches")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@Tag(name = "Coach API", description = "Quản lý thông tin xe khách")
public class CoachController {
		
		@Autowired
		private final CoachService coachService;
		
		@Autowired
		private final ModelMapper modelMapper;
		
		@Autowired
		private final SeatService seatService;
		
		/**
		 * 📌 Tạo mới Coach
		 * @param form Thông tin xe khách cần tạo
		 * @return Thông tin xe khách đã tạo
		 */
		@Operation(summary = "Tạo xe khách mới", description = "Tạo mới một xe khách với thông tin được cung cấp.")
		@PostMapping
		public ResponseEntity<ApiResponse<CoachResponseDTO>> createCoach(@RequestBody @Valid CoachCreateForm form) {
				Coach entity = coachService.create(form);
				CoachResponseDTO dto = modelMapper.map(entity, CoachResponseDTO.class);
				return ResponseEntity.ok(new ApiResponse<>(200, "Tạo coach thành công", dto));
		}
		
		/**
		 * 📌 Cập nhật thông tin Coach
		 * @param id ID của xe khách cần cập nhật
		 * @param form Thông tin cập nhật xe khách
		 * @return Thông tin xe khách sau khi cập nhật
		 */
		@Operation(summary = "Cập nhật xe khách", description = "Cập nhật thông tin xe khách dựa trên ID của xe khách.")
		@PatchMapping("/{id}")
		public ResponseEntity<ApiResponse<CoachResponseDTO>> updateCoach(
				@Parameter(description = "ID của xe khách cần cập nhật") @PathVariable String id,
				@RequestBody @Valid CoachUpdateForm form) {
				
				Coach entity = coachService.update(id, form);
				CoachResponseDTO dto = modelMapper.map(entity, CoachResponseDTO.class);
				
				return ResponseEntity.ok(new ApiResponse<>(200, "Cập nhật coach thành công", dto));
		}
		
		/**
		 * 📌 Lấy Coach theo ID
		 * @param id ID của xe khách cần lấy thông tin
		 * @return Thông tin xe khách và danh sách ghế của xe
		 */
		@Operation(summary = "Lấy coach theo ID", description = "Lấy thông tin chi tiết của xe khách và các ghế của xe khách.")
		@GetMapping("/{id}")
		public ResponseEntity<ApiResponse<CoachResponseDTO>> getCoachById(
				@Parameter(description = "ID của xe khách cần lấy thông tin") @PathVariable String id) {
				CoachResponseDTO dto  = coachService.getById(id);
				List<SeatResponseDTO> seatResponseDTOS = seatService.getById(id);
				
				return ResponseEntity.ok(new ApiResponse<>(200, "Lấy coach thành công", dto));
		}
		
		/**
		 * 📌 Lọc danh sách Coach
		 * @param pageable Tham số phân trang
		 * @param filter Các tham số lọc (loại, trạng thái, sức chứa...)
		 * @return Danh sách xe khách sau khi lọc
		 */
		@Operation(summary = "Lọc danh sách coach", description = "Hỗ trợ phân trang và lọc theo các tiêu chí như type, status, capacity,...")
		@GetMapping
		public ResponseEntity<ApiResponse<Page<CoachResponseDTO>>> filterCoaches(
				@Parameter(description = "Tham số phân trang") Pageable pageable,
				@Parameter(description = "Các tham số lọc cho xe khách") CoachFilter filter) {
				Page<CoachResponseDTO> result = coachService.filter(pageable, filter);
				
				return ResponseEntity.ok(new ApiResponse<>(200, "Lọc danh sách coach thành công", result));
		}
}
