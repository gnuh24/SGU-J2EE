package com.sgu.backend.controllers;

import com.sgu.backend.apiresponse.ApiResponse;
import com.sgu.backend.dto.request.city.CityCreateForm;
import com.sgu.backend.dto.request.city.CityFilterForm;
import com.sgu.backend.dto.request.city.CityUpdateForm;
import com.sgu.backend.dto.response.city.CityResponseDTO;
import com.sgu.backend.entities.City;
import com.sgu.backend.services.CityService;
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
public class CityController {

    @Autowired
    private CityService cityService;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping(value = "/no-paging")
    public ResponseEntity<ApiResponse<List<CityResponseDTO>>> getAllCityNoPaging() {
	List<City> cities = cityService.getAllCityNoPaging();
	List<CityResponseDTO> dtos = modelMapper.map(cities, new TypeToken<List<CityResponseDTO>>() {}.getType());
	return ResponseEntity.ok(new ApiResponse<>(200, "Lấy danh sách thành phố thành công", dtos));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<CityResponseDTO>>> getAllCity(
		Pageable pageable,
		CityFilterForm form) {
	Page<City> entities = cityService.getAllCityByAdmin(pageable, form);
	List<CityResponseDTO> dtos = modelMapper.map(entities.getContent(), new TypeToken<List<CityResponseDTO>>() {}.getType());
	Page<CityResponseDTO> page = new PageImpl<>(dtos, pageable, entities.getTotalElements());

	return ResponseEntity.ok(new ApiResponse<>(200, "Lấy danh sách thành phố thành công", page));
    }

    @GetMapping(value = "/{cityId}")
    public ResponseEntity<ApiResponse<CityResponseDTO>> getCityById(@PathVariable String cityId) {
	City entity = cityService.getCityById(cityId);
	CityResponseDTO dto = modelMapper.map(entity, CityResponseDTO.class);

	return ResponseEntity.ok(new ApiResponse<>(200, "Lấy thành phố thành công", dto));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<CityResponseDTO>> createCity(@RequestBody @Valid CityCreateForm form) {
	City entity = cityService.createCity(form);
	CityResponseDTO dto = modelMapper.map(entity, CityResponseDTO.class);

	return ResponseEntity.status(201).body(new ApiResponse<>(201, "Tạo thành phố thành công", dto));
    }

    @PatchMapping(value = "/{cityId}")
    public ResponseEntity<ApiResponse<CityResponseDTO>> updateCity(@PathVariable String cityId,
								   @RequestBody @Valid CityUpdateForm form) {
	City entity = cityService.updateCity(cityId, form);
	CityResponseDTO dto = modelMapper.map(entity, CityResponseDTO.class);

	return ResponseEntity.ok(new ApiResponse<>(200, "Cập nhật thành phố thành công", dto));
    }
}
