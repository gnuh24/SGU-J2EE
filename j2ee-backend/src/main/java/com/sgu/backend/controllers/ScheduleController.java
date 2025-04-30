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

@RestController
@RequestMapping("/schedules")
@CrossOrigin(origins = "*")
@Tag(name = "Schedule API", description = "Quản lý lịch trình xe chạy")
public class ScheduleController {

    @Autowired
    private ScheduleService scheduleService;

    @Operation(summary = "Lấy danh sách lịch trình")
    @GetMapping
    public ResponseEntity<ApiResponse<Page<ScheduleResponseDTO>>> getAll(Pageable pageable, ScheduleFilterForm filter) {
        Page<ScheduleResponseDTO> result = scheduleService.getAll(pageable, filter);
        return ResponseEntity.ok(new ApiResponse<>(200, "Lấy danh sách lịch trình thành công", result));
    }

    @Operation(summary = "Lấy lịch trình theo ID")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ScheduleResponseDTO>> getById(@PathVariable String id) {
        ScheduleResponseDTO dto = scheduleService.getById(id);
        return ResponseEntity.ok(new ApiResponse<>(200, "Lấy lịch trình thành công", dto));
    }

    @Operation(summary = "Tạo lịch trình")
    @PostMapping
    public ResponseEntity<ApiResponse<ScheduleResponseDTO>> create(@RequestBody @Valid ScheduleCreateForm form) {
        ScheduleResponseDTO created = scheduleService.create(form);
        return ResponseEntity.ok(new ApiResponse<>(201, "Tạo lịch trình thành công", created));
    }

    @Operation(summary = "Cập nhật lịch trình")
    @PatchMapping("/{id}")
    public ResponseEntity<ApiResponse<ScheduleResponseDTO>> update(@PathVariable String id, @RequestBody @Valid ScheduleUpdateForm form) {
        ScheduleResponseDTO updated = scheduleService.update(id, form);
        return ResponseEntity.ok(new ApiResponse<>(200, "Cập nhật lịch trình thành công", updated));
    }

    @Operation(summary = "Xoá lịch trình")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable String id) {
        scheduleService.delete(id);
        return ResponseEntity.ok(new ApiResponse<>(200, "Xoá lịch trình thành công", null));
    }
}
