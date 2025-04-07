package com.sgu.backend.controllers;

import com.sgu.backend.apiresponse.ApiResponse;
import com.sgu.backend.dto.request.profile.*;
import com.sgu.backend.dto.response.position.PositionResponseDTO;
import com.sgu.backend.dto.response.profile.ProfileDetailResponseDTO;
import com.sgu.backend.entities.Account;
import com.sgu.backend.entities.Profile;
import com.sgu.backend.entities.ProfilePosition;
import com.sgu.backend.services.ProfileService;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/profiles")
@CrossOrigin(origins = "*")

public class ProfileController {

    @Autowired
    private ProfileService profileService;


    @Autowired
    private ModelMapper modelMapper;

    // 🔹 Lấy danh sách tất cả profile
    @GetMapping
    public ResponseEntity<ApiResponse<Page<ProfileDetailResponseDTO>>> getAllProfiles(
	    Pageable pageable,
	    @RequestParam(required = false) String search,
	    ProfileFilterForm filterForm) {

	// 🔹 Lấy danh sách profile đã lọc, tìm kiếm và phân trang
	Page<Profile> profiles = profileService.getAllProfile(pageable, search, filterForm);

	// 🔹 Chuyển đổi Profile entities sang DTOs
	List<ProfileDetailResponseDTO> dtos = modelMapper.map(
		profiles.getContent(),
		new TypeToken<List<ProfileDetailResponseDTO>>(){}.getType()
	);



	// 🔹 Chuyển đổi danh sách thành Page
	Page<ProfileDetailResponseDTO> profileDTOs = new PageImpl<>(dtos, pageable, profiles.getTotalElements());

	// 🔹 Trả về response
	return ResponseEntity.ok(new ApiResponse<>(200, "Danh sách profile lấy thành công", profileDTOs));
    }


    @GetMapping("/{profileId}")
    public ResponseEntity<ApiResponse<ProfileDetailResponseDTO>> getProfileById(@PathVariable String profileId) {
	Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	Account account = (Account) authentication.getPrincipal(); // Lấy thông tin từ SecurityContext

	if (account.getRole() == Account.Role.ADMIN) {
	    // Admin có thể lấy thông tin của bất kỳ ai
	    ProfileDetailResponseDTO profile = modelMapper.map(profileService.getProfileById(profileId), ProfileDetailResponseDTO.class);
	    return ResponseEntity.ok(new ApiResponse<>(200, "Lấy thông tin profile thành công", profile));
	}

	// Nếu là User, chỉ cho phép lấy thông tin của chính họ
	if (!account.getId().equals(profileId)) {
	    throw new AccessDeniedException("Bạn không có quyền truy cập thông tin người khác");
	}

	ProfileDetailResponseDTO profile = modelMapper.map(account.getProfile(), ProfileDetailResponseDTO.class);
	return ResponseEntity.ok(new ApiResponse<>(200, "Lấy thông tin profile thành công", profile));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ProfileDetailResponseDTO>> createProfile(@RequestBody @Valid ProfileCreateForm form) {

	// Tạo Profile mới
	Profile newProfile = profileService.createProfile(form);
	ProfileDetailResponseDTO responseDTO = modelMapper.map(newProfile, ProfileDetailResponseDTO.class);

	return ResponseEntity.status(HttpStatus.CREATED)
		.body(new ApiResponse<>(201, "Tạo Profile thành công", responseDTO));
    }


    @PatchMapping("/me")
    public ResponseEntity<ApiResponse<ProfileDetailResponseDTO>> updateProfile(
	    @RequestBody @Valid ProfileUpdateForm form) {

	Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	Account account = (Account) authentication.getPrincipal();

	Profile updatedProfile = profileService.updatePersionalInformationOfProfile(account.getProfile(), form);
	ProfileDetailResponseDTO responseDTO = modelMapper.map(updatedProfile, ProfileDetailResponseDTO.class);

	return ResponseEntity.ok(
		new ApiResponse<>(200, "Cập nhật profile thành công", responseDTO)
	);
    }

}
