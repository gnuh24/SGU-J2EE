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

import java.util.List;

/**
 * RouteController handles all route-related API requests, including retrieving,
 * creating, and updating routes.
 */
@RestController
@RequestMapping("/routes")
@CrossOrigin(origins = "*")
@Tag(name = "Route API", description = "Quản lý tuyến đường")
public class RouteController {
		
		@Autowired
		private RouteService routeService;
		
		/**
		 * Get a paginated list of all routes, with optional filtering.
		 *
		 * @param pageable the pagination information
		 * @param filter   the optional filter criteria for retrieving routes
		 * @return a paginated list of route responses
		 */
		@Operation(summary = "Lấy danh sách tuyến đường", description = "Lấy danh sách tất cả tuyến đường, có hỗ trợ phân trang và lọc.")
		@GetMapping
		public ResponseEntity<ApiResponse<Page<RouteResponse>>> getAll(Pageable pageable, RouteFilter filter) {
				return ResponseEntity.ok(new ApiResponse<>(200, "Danh sách tuyến đường", routeService.getAll(pageable, filter)));
		}
		

		@Operation(summary = "Lấy danh sách tuyến đường", description = "Lấy danh sách tất cả tuyến đường, có hỗ trợ lọc.")
		@GetMapping("no-paging")
		public ResponseEntity<ApiResponse<List<RouteResponse>>> getAll() {
				List<RouteResponse> routes = routeService.getAllNoPaging();
				return ResponseEntity.ok(new ApiResponse<>(200, "Danh sách tuyến đường", routes));
		}

		
		/**
		 * Get the details of a specific route by its ID.
		 *
		 * @param id the ID of the route to retrieve
		 * @return the detailed response of the requested route
		 */
		@Operation(summary = "Lấy tuyến đường theo ID", description = "Lấy chi tiết tuyến đường thông qua ID.")
		@GetMapping("/{id}")
		public ResponseEntity<ApiResponse<RouteResponse>> getById(@PathVariable String id) {
				return ResponseEntity.ok(new ApiResponse<>(200, "Chi tiết tuyến đường", routeService.getById(id)));
		}
		
		/**
		 * Create a new route.
		 *
		 * @param form the form containing the data to create the route
		 * @return the response of the created route
		 */
		@Operation(summary = "Tạo tuyến đường", description = "Tạo một tuyến đường mới dựa trên thông tin được gửi từ form.")
		@PostMapping
		public ResponseEntity<ApiResponse<RouteResponse>> create(@RequestBody @Valid RouteCreateForm form) {
				return ResponseEntity.ok(new ApiResponse<>(201, "Tạo tuyến đường thành công", routeService.create(form)));
		}
		
		/**
		 * Update an existing route by its ID.
		 *
		 * @param id   the ID of the route to update
		 * @param form the form containing the updated data
		 * @return the response of the updated route
		 */
		@Operation(summary = "Cập nhật tuyến đường", description = "Cập nhật thông tin của tuyến đường hiện tại.")
		@PatchMapping("/{id}")
		public ResponseEntity<ApiResponse<RouteResponse>> update(@PathVariable String id, @RequestBody @Valid RouteUpdateForm form) {
				return ResponseEntity.ok(new ApiResponse<>(200, "Cập nhật tuyến đường thành công", routeService.update(id, form)));
		}
		
}
