package com.sgu.user.controllers;

import com.sgu.user.apiresponse.ApiResponse;
import com.sgu.user.dto.response.position.PositionResponseDTO;
import com.sgu.user.entities.Position;
import com.sgu.user.services.PositionService;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/positions")
@Tag(name = "Position API", description = "Quản lý chức vụ trong hệ thống")
public class PositionController {

    @Autowired
    private PositionService positionService;

    @Autowired
    private ModelMapper modelMapper;

    /**
     * 📌 Lấy danh sách tất cả chức vụ (Không phân trang)
     * @return Danh sách chức vụ dưới dạng DTO
     */
    @GetMapping("/no-paging")
    @Operation(summary = "Lấy danh sách tất cả chức vụ", description = "Trả về danh sách không phân trang của các chức vụ")
    public ResponseEntity<ApiResponse<List<PositionResponseDTO>>> getAllPositionsWithoutPaging() {
	List<Position> positions = positionService.getAllPositionsWithoutPaging();

	// Chuyển đổi danh sách từ Entity sang DTO
	List<PositionResponseDTO> positionDTOs = modelMapper.map(positions, new TypeToken<List<PositionResponseDTO>>(){}.getType());

	return ResponseEntity.ok(new ApiResponse<>(200, "Lấy danh sách chức vụ thành công", positionDTOs));
    }
}
