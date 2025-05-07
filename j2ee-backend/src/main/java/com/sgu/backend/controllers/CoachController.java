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
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
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

    private final CoachService coachService;
    private final ModelMapper modelMapper;
    private final SeatService seatService;

    /**
     * 📌 Tạo mới Coach
     */
    @Operation(summary = "Tạo xe khách mới")
    @PostMapping
    public ResponseEntity<ApiResponse<CoachResponseDTO>> createCoach(@RequestBody @Valid CoachCreateForm form) {
        CoachResponseDTO dto = coachService.create(form);

        return ResponseEntity.ok(new ApiResponse<>(200, "Tạo coach thành công", dto));
    }

    /**
     * 📌 Cập nhật thông tin Coach
     */
    @Operation(summary = "Cập nhật xe khách")
    @PatchMapping("/{id}")
    public ResponseEntity<ApiResponse<CoachResponseDTO>> updateCoach(@PathVariable String id, @RequestBody @Valid CoachUpdateForm form) {
        CoachResponseDTO dto = coachService.update(id, form);

        return ResponseEntity.ok(new ApiResponse<>(200, "Cập nhật coach thành công", dto));
    }

    /**
     * 📌 Xóa coach
     */
    @Operation(summary = "Xóa xe khách")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteCoach(@PathVariable String id) {
        coachService.delete(id);
        return ResponseEntity.ok(new ApiResponse<>(200, "Xóa coach thành công", null));
    }

    /**
     * 📌 Lấy coach theo ID
     */
    @Operation(summary = "Lấy coach theo ID")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CoachResponseDTO>> getCoachById(@PathVariable String id) {
        CoachResponseDTO dto  = coachService.getById(id);
        List<SeatResponseDTO> seatResponseDTOS=seatService.getById(id);

        return ResponseEntity.ok(new ApiResponse<>(200, "Lấy coach thành công", dto));
    }

    /**
     * 📌 Lọc danh sách coach
     */
    @Operation(summary = "Lọc danh sách coach", description = "Hỗ trợ phân trang và lọc theo type, status, capacity...")
    @GetMapping()
    public ResponseEntity<ApiResponse<Page<CoachResponseDTO>>> filterCoaches(Pageable pageable,  CoachFilter filter) {
        Page<CoachResponseDTO> result = coachService.filter(pageable, filter);

        return ResponseEntity.ok(new ApiResponse<>(200, "Lọc danh sách coach thành công", result));
    }
}