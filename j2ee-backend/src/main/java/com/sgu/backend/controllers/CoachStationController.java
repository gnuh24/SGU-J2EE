package com.sgu.backend.controllers;

import com.sgu.backend.apiresponse.ApiResponse;
import com.sgu.backend.dto.request.coach_station.CoachStationCreateForm;
import com.sgu.backend.dto.request.coach_station.CoachStationFilterForm;
import com.sgu.backend.dto.request.coach_station.CoachStationUpdateForm;
import com.sgu.backend.dto.response.coach_station.CoachStationResponseDTO;
import com.sgu.backend.entities.CoachStation;
import com.sgu.backend.services.CoachStationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/coach-stations")
@CrossOrigin(origins = "*")
@Tag(name = "Coach Station API", description = "Quản lý thông tin bến xe khách")
public class CoachStationController {
		
		@Autowired
		private CoachStationService coachStationService;
		
		@Autowired
		private ModelMapper modelMapper;
		
		/**
		 * 📌 Lấy danh sách bến xe
		 * @param pageable Tham số phân trang
		 * @param form Tham số lọc (nếu có)
		 * @return Danh sách bến xe
		 */
		@Operation(summary = "Lấy danh sách bến xe", description = "Lấy danh sách bến xe theo phân trang và các tham số lọc.")
		@GetMapping
		public ResponseEntity<ApiResponse<Page<CoachStationResponseDTO>>> getAllCoachStations(
				@Parameter(description = "Tham số phân trang") Pageable pageable,
				@Parameter(description = "Các tham số lọc cho bến xe") CoachStationFilterForm form) {
				
				Page<CoachStation> entities = coachStationService.getAllCoachStationsByAdmin(pageable, form);
				List<CoachStationResponseDTO> dtos = modelMapper.map(entities.getContent(), new TypeToken<List<CoachStationResponseDTO>>() {}.getType());
				Page<CoachStationResponseDTO> page = new PageImpl<>(dtos, pageable, entities.getTotalElements());
				
				return ResponseEntity.ok(new ApiResponse<>(200, "Lấy danh sách bến xe thành công", page));
		}
		
		/**
		 * 📌 Lấy danh sách bến xe theo thành phố
		 * @param cityId ID của thành phố
		 * @return Danh sách bến xe của thành phố
		 */
		@Operation(summary = "Lấy danh sách bến xe theo thành phố", description = "Lấy danh sách bến xe theo thành phố dựa trên cityId.")
		@GetMapping(value = "/city/{cityId}")
		public ResponseEntity<ApiResponse<List<CoachStationResponseDTO>>> getAllCoachStationsByCityId(
				@Parameter(description = "ID của thành phố") @PathVariable String cityId) {
				
				List<CoachStation> entities = coachStationService.getAllCoachStationByCityId(cityId);
				List<CoachStationResponseDTO> dtos = modelMapper.map(entities, new TypeToken<List<CoachStationResponseDTO>>() {}.getType());
				
				return ResponseEntity.ok(new ApiResponse<>(200, "Lấy danh sách bến xe theo thành phố thành công", dtos));
		}
		
		/**
		 * 📌 Lấy thông tin bến xe theo ID
		 * @param coachStationId ID của bến xe
		 * @return Thông tin chi tiết bến xe
		 */
		@Operation(summary = "Lấy thông tin bến xe theo ID", description = "Lấy thông tin chi tiết của bến xe dựa trên coachStationId.")
		@GetMapping(value = "/{coachStationId}")
		public ResponseEntity<ApiResponse<CoachStationResponseDTO>> getCoachStationById(
				@Parameter(description = "ID của bến xe cần lấy thông tin") @PathVariable String coachStationId) {
				
				CoachStation entity = coachStationService.getCoachStationById(coachStationId);
				CoachStationResponseDTO dto = modelMapper.map(entity, CoachStationResponseDTO.class);
				
				return ResponseEntity.ok(new ApiResponse<>(200, "Lấy thông tin bến xe thành công", dto));
		}
		
		/**
		 * 📌 Tạo mới một bến xe
		 * @param form Thông tin bến xe cần tạo
		 * @return Thông tin bến xe sau khi tạo
		 */
		@Operation(summary = "Tạo bến xe mới", description = "Tạo mới một bến xe với thông tin được cung cấp.")
		@PostMapping
		public ResponseEntity<ApiResponse<CoachStationResponseDTO>> createCoachStation(
				@RequestBody @Valid CoachStationCreateForm form) {
				
				CoachStation entity = coachStationService.createCoachStation(form);
				CoachStationResponseDTO dto = modelMapper.map(entity, CoachStationResponseDTO.class);
				
				return ResponseEntity.status(201).body(new ApiResponse<>(201, "Tạo bến xe thành công", dto));
		}
		
		/**
		 * 📌 Cập nhật thông tin bến xe
		 * @param coachStationId ID của bến xe cần cập nhật
		 * @param form Thông tin cập nhật bến xe
		 * @return Thông tin bến xe sau khi cập nhật
		 */
		@Operation(summary = "Cập nhật bến xe", description = "Cập nhật thông tin bến xe dựa trên ID của bến xe.")
		@PatchMapping(value = "/{coachStationId}")
		public ResponseEntity<ApiResponse<CoachStationResponseDTO>> updateCoachStation(
				@Parameter(description = "ID của bến xe cần cập nhật") @PathVariable String coachStationId,
				@RequestBody @Valid CoachStationUpdateForm form) {
				
				CoachStation entity = coachStationService.updateCoachStation(coachStationId, form);
				CoachStationResponseDTO dto = modelMapper.map(entity, CoachStationResponseDTO.class);
				
				return ResponseEntity.ok(new ApiResponse<>(200, "Cập nhật bến xe thành công", dto));
		}
}
