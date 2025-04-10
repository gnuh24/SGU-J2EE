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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/seats")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@Tag(name = "Seat API", description = "Quản lý ghế của xe khách")
public class SeatController {

    private final SeatService seatService;
    private final ModelMapper modelMapper;

    /**
     * 📌 Lấy thông tin ghế theo ID coach
     */
    @Operation(summary = "Lấy thông tin ghế")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<List<SeatResponseDTO>>> getSeatById(@PathVariable String id) {
       List<SeatResponseDTO> dto = seatService.getById(id);

        return ResponseEntity.ok(new ApiResponse<>(200, "Lấy ghế thành công", dto));
    }


}
