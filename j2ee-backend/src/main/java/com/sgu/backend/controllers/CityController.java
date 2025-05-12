package com.sgu.backend.controllers;

import com.sgu.backend.apiresponse.ApiResponse;
import com.sgu.backend.dto.request.city.CityCreateForm;
import com.sgu.backend.dto.request.city.CityFilterForm;
import com.sgu.backend.dto.request.city.CityUpdateForm;
import com.sgu.backend.dto.response.city.CityResponseDTO;
import com.sgu.backend.entities.City;
import com.sgu.backend.services.CityService;
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
@RequestMapping(value = "/cities")
@CrossOrigin(origins = "*")
@Tag(name = "City API", description = "Quản lý thông tin thành phố")
public class CityController {
		
		@Autowired
		private CityService cityService;
		
		@Autowired
		private ModelMapper modelMapper;
		
		/**
		 * 📌 Lấy tất cả thành phố không phân trang
		 * @return Danh sách tất cả thành phố
		 */
		@Operation(summary = "Lấy tất cả thành phố không phân trang", description = "Lấy danh sách thành phố mà không sử dụng phân trang.")
		@GetMapping(value = "/no-paging")
		public ResponseEntity<ApiResponse<List<CityResponseDTO>>> getAllCityNoPaging() {
				List<City> cities = cityService.getAllCityNoPaging();
				List<CityResponseDTO> dtos = modelMapper.map(cities, new TypeToken<List<CityResponseDTO>>() {}.getType());
				return ResponseEntity.ok(new ApiResponse<>(200, "Lấy danh sách thành phố thành công", dtos));
		}
		
		/**
		 * 📌 Lấy tất cả thành phố có phân trang
		 * @param pageable Tham số phân trang
		 * @param form Các tham số lọc thành phố
		 * @return Danh sách thành phố theo trang
		 */
		@Operation(summary = "Lấy tất cả thành phố có phân trang", description = "Lấy danh sách thành phố với phân trang và các tham số lọc.")
		@GetMapping
		public ResponseEntity<ApiResponse<Page<CityResponseDTO>>> getAllCity(
				Pageable pageable,
				CityFilterForm form) {
				Page<City> entities = cityService.getAllCityByAdmin(pageable, form);
				List<CityResponseDTO> dtos = modelMapper.map(entities.getContent(), new TypeToken<List<CityResponseDTO>>() {}.getType());
				Page<CityResponseDTO> page = new PageImpl<>(dtos, pageable, entities.getTotalElements());
				
				return ResponseEntity.ok(new ApiResponse<>(200, "Lấy danh sách thành phố thành công", page));
		}
		
		/**
		 * 📌 Lấy thông tin thành phố theo ID
		 * @param cityId ID thành phố cần tìm
		 * @return Thông tin thành phố
		 */
		@Operation(summary = "Lấy thông tin thành phố theo ID", description = "Lấy thông tin chi tiết của thành phố dựa trên ID.")
		@GetMapping(value = "/{cityId}")
		public ResponseEntity<ApiResponse<CityResponseDTO>> getCityById(
				@Parameter(description = "ID của thành phố cần lấy thông tin", example = "cityId") @PathVariable String cityId) {
				City entity = cityService.getCityById(cityId);
				CityResponseDTO dto = modelMapper.map(entity, CityResponseDTO.class);
				
				return ResponseEntity.ok(new ApiResponse<>(200, "Lấy thành phố thành công", dto));
		}
		
		/**
		 * 📌 Tạo mới một thành phố
		 * @param form Thông tin thành phố mới
		 * @return Thông tin thành phố đã tạo
		 */
		@Operation(summary = "Tạo mới thành phố", description = "Tạo mới một thành phố với thông tin được cung cấp.")
		@PostMapping
		public ResponseEntity<ApiResponse<CityResponseDTO>> createCity(
				@RequestBody @Valid CityCreateForm form) {
				City entity = cityService.createCity(form);
				CityResponseDTO dto = modelMapper.map(entity, CityResponseDTO.class);
				
				return ResponseEntity.status(201).body(new ApiResponse<>(201, "Tạo thành phố thành công", dto));
		}
		
		/**
		 * 📌 Cập nhật thông tin thành phố
		 * @param cityId ID thành phố cần cập nhật
		 * @param form Thông tin cập nhật thành phố
		 * @return Thông tin thành phố sau khi cập nhật
		 */
		@Operation(summary = "Cập nhật thông tin thành phố", description = "Cập nhật thông tin thành phố dựa trên ID.")
		@PatchMapping(value = "/{cityId}")
		public ResponseEntity<ApiResponse<CityResponseDTO>> updateCity(
				@PathVariable String cityId,
				@RequestBody @Valid CityUpdateForm form) {
				City entity = cityService.updateCity(cityId, form);
				CityResponseDTO dto = modelMapper.map(entity, CityResponseDTO.class);
				
				return ResponseEntity.ok(new ApiResponse<>(200, "Cập nhật thành phố thành công", dto));
		}
}
