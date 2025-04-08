package com.sgu.backend.controllers;

import com.sgu.backend.apiresponse.ApiResponse;
import com.sgu.backend.dto.request.coach_station.CoachStationCreateForm;
import com.sgu.backend.dto.request.coach_station.CoachStationFilterForm;
import com.sgu.backend.dto.request.coach_station.CoachStationUpdateForm;
import com.sgu.backend.dto.response.coach_station.CoachStationResponseDTO;
import com.sgu.backend.entities.CoachStation;
import com.sgu.backend.services.CoachStationService;
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
public class CoachStationController {

    @Autowired
    private CoachStationService coachStationService;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping
    public ResponseEntity<ApiResponse<Page<CoachStationResponseDTO>>> getAllCoachStations(Pageable pageable, CoachStationFilterForm form) {
	Page<CoachStation> entities = coachStationService.getAllCoachStationsByAdmin(pageable, form);
	List<CoachStationResponseDTO> dtos = modelMapper.map(entities.getContent(), new TypeToken<List<CoachStationResponseDTO>>() {}.getType());
	Page<CoachStationResponseDTO> page = new PageImpl<>(dtos, pageable, entities.getTotalElements());

	return ResponseEntity.ok(new ApiResponse<>(200, "Lấy danh sách bến xe thành công", page));
    }

    @GetMapping(value = "/city/{cityId}")
    public ResponseEntity<ApiResponse<List<CoachStationResponseDTO>>> getAllCoachStationsByCityId(@PathVariable String cityId) {
	List<CoachStation> entities = coachStationService.getAllCoachStationByCityId(cityId);
	List<CoachStationResponseDTO> dtos = modelMapper.map(entities, new TypeToken<List<CoachStationResponseDTO>>() {}.getType());

	return ResponseEntity.ok(new ApiResponse<>(200, "Lấy danh sách bến xe theo thành phố thành công", dtos));
    }

    @GetMapping(value = "/{coachStationId}")
    public ResponseEntity<ApiResponse<CoachStationResponseDTO>> getCoachStationById(@PathVariable String coachStationId) {
	CoachStation entity = coachStationService.getCoachStationById(coachStationId);
	CoachStationResponseDTO dto = modelMapper.map(entity, CoachStationResponseDTO.class);

	return ResponseEntity.ok(new ApiResponse<>(200, "Lấy thông tin bến xe thành công", dto));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<CoachStationResponseDTO>> createCoachStation(@RequestBody @Valid CoachStationCreateForm form) {
	CoachStation entity = coachStationService.createCoachStation(form);
	CoachStationResponseDTO dto = modelMapper.map(entity, CoachStationResponseDTO.class);

	return ResponseEntity.status(201).body(new ApiResponse<>(201, "Tạo bến xe thành công", dto));
    }

    @PatchMapping(value = "/{coachStationId}")
    public ResponseEntity<ApiResponse<CoachStationResponseDTO>> updateCoachStation(@PathVariable String coachStationId,
										   @RequestBody @Valid CoachStationUpdateForm form) {
	CoachStation entity = coachStationService.updateCoachStation(coachStationId, form);
	CoachStationResponseDTO dto = modelMapper.map(entity, CoachStationResponseDTO.class);

	return ResponseEntity.ok(new ApiResponse<>(200, "Cập nhật bến xe thành công", dto));
    }
}
