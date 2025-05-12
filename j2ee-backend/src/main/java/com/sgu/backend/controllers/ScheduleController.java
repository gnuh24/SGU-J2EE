package com.sgu.backend.controllers;

import com.sgu.backend.apiresponse.ApiResponse;
import com.sgu.backend.dto.request.schedule.ScheduleCreateForm;
import com.sgu.backend.dto.request.schedule.ScheduleFilterForm;
import com.sgu.backend.dto.request.schedule.ScheduleUpdateForm;
import com.sgu.backend.dto.response.schedule.ScheduleResponseDTO;
import com.sgu.backend.services.ScheduleService;
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

/**
 * ScheduleController handles all schedule-related API requests, including retrieving,
 * creating, and updating schedules.
 */
@RestController
@RequestMapping("/schedules")
@CrossOrigin(origins = "*")
@Tag(name = "Schedule API", description = "Quản lý lịch trình xe chạy")
public class ScheduleController {
		
		@Autowired
		private ScheduleService scheduleService;
		
		/**
		 * Get a paginated list of all schedules, with optional filtering.
		 *
		 * @param pageable the pagination information
		 * @param filter   the optional filter criteria for retrieving schedules
		 * @return a paginated list of schedule responses
		 */
		@Operation(summary = "Lấy danh sách lịch trình", description = "Lấy danh sách tất cả lịch trình xe chạy, có hỗ trợ phân trang và lọc theo các tiêu chí.")
		@GetMapping
		public ResponseEntity<ApiResponse<Page<ScheduleResponseDTO>>> getAll(Pageable pageable, ScheduleFilterForm filter) {
				Page<ScheduleResponseDTO> result = scheduleService.getAll(pageable, filter);
				return ResponseEntity.ok(new ApiResponse<>(200, "Lấy danh sách lịch trình thành công", result));
		}
		
		/**
		 * Get the details of a specific schedule by its ID.
		 *
		 * @param id the ID of the schedule to retrieve
		 * @return the detailed response of the requested schedule
		 */
		@Operation(summary = "Lấy lịch trình theo ID", description = "Lấy chi tiết lịch trình xe chạy thông qua ID.")
		@GetMapping("/{id}")
		public ResponseEntity<ApiResponse<ScheduleResponseDTO>> getById(@PathVariable String id) {
				ScheduleResponseDTO dto = scheduleService.getById(id);
				return ResponseEntity.ok(new ApiResponse<>(200, "Lấy lịch trình thành công", dto));
		}
		
		/**
		 * Create a new schedule.
		 *
		 * @param form the form containing the data to create the schedule
		 * @return the response of the created schedule
		 */
		@Operation(summary = "Tạo lịch trình", description = "Tạo một lịch trình xe chạy mới dựa trên thông tin được gửi từ form.")
		@PostMapping
		public ResponseEntity<ApiResponse<ScheduleResponseDTO>> create(@RequestBody @Valid ScheduleCreateForm form) {
				ScheduleResponseDTO created = scheduleService.create(form);
				return ResponseEntity.ok(new ApiResponse<>(201, "Tạo lịch trình thành công", created));
		}
		
		/**
		 * Update an existing schedule by its ID.
		 *
		 * @param id   the ID of the schedule to update
		 * @param form the form containing the updated data
		 * @return the response of the updated schedule
		 */
		@Operation(summary = "Cập nhật lịch trình", description = "Cập nhật thông tin của lịch trình xe chạy hiện tại.")
		@PatchMapping("/{id}")
		public ResponseEntity<ApiResponse<ScheduleResponseDTO>> update(@PathVariable String id, @RequestBody @Valid ScheduleUpdateForm form) {
				ScheduleResponseDTO updated = scheduleService.update(id, form);
				return ResponseEntity.ok(new ApiResponse<>(200, "Cập nhật lịch trình thành công", updated));
		}
		
}
