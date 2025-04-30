package com.sgu.backend.controllers;

import com.sgu.backend.apiresponse.ApiResponse;
import com.sgu.backend.dto.request.route.RouteCreateForm;
import com.sgu.backend.dto.request.route.RouteFilter;
import com.sgu.backend.dto.request.route.RouteUpdateForm;
import com.sgu.backend.dto.response.route.RouteResponse;
import com.sgu.backend.services.RouteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/routes")
@CrossOrigin(origins = "*")
@Tag(name = "Route API", description = "Quản lý tuyến đường")
public class RouteController {

    @Autowired
    private RouteService routeService;

    @Operation(summary = "Lấy danh sách tuyến đường")
    @GetMapping
    public ResponseEntity<ApiResponse<Page<RouteResponse>>> getAll(Pageable pageable, RouteFilter filter) {
        return ResponseEntity.ok(new ApiResponse<>(200, "Danh sách tuyến đường", routeService.getAll(pageable, filter)));
    }

    @Operation(summary = "Lấy tuyến đường theo ID")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<RouteResponse>> getById(@PathVariable String id) {
        return ResponseEntity.ok(new ApiResponse<>(200, "Chi tiết tuyến đường", routeService.getById(id)));
    }

    @Operation(summary = "Tạo tuyến đường")
    @PostMapping
    public ResponseEntity<ApiResponse<RouteResponse>> create(@RequestBody @Valid RouteCreateForm form) {
        return ResponseEntity.ok(new ApiResponse<>(201, "Tạo tuyến đường thành công", routeService.create(form)));
    }

    @Operation(summary = "Cập nhật tuyến đường")
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<RouteResponse>> update(@PathVariable String id, @RequestBody @Valid RouteUpdateForm form) {
        return ResponseEntity.ok(new ApiResponse<>(200, "Cập nhật tuyến đường thành công", routeService.update(id, form)));
    }

    @Operation(summary = "Xoá tuyến đường")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable String id) {
        routeService.delete(id);
        return ResponseEntity.ok(new ApiResponse<>(200, "Xoá tuyến đường thành công", null));
    }
}
