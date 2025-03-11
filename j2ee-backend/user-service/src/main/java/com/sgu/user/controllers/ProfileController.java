package com.sgu.user.controllers;

import com.sgu.user.apiresponse.ApiResponse;
import com.sgu.user.dto.request.profile.*;
import com.sgu.user.dto.response.position.PositionResponseDTO;
import com.sgu.user.dto.response.profile.ProfileDetailResponseDTO;
import com.sgu.user.dto.response.profile.ProfilePositionResponseDTO;
import com.sgu.user.entities.Account;
import com.sgu.user.entities.Profile;
import com.sgu.user.entities.ProfilePosition;
import com.sgu.user.services.ProfilePositionService;
import com.sgu.user.services.ProfileService;
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
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @Autowired
    private ProfilePositionService profilePositionService;

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

	// 🔹 Duyệt từng DTO để lấy vị trí hiện tại
	for (ProfileDetailResponseDTO dto : dtos) {
		ProfilePosition profilePosition = profilePositionService.getCurrentProfilePosition(dto.getId());

		if (profilePosition != null) {
		    PositionResponseDTO positionResponseDTO = modelMapper.map(
			    profilePosition.getPosition(),
			    PositionResponseDTO.class
		    );
		    dto.setPosition(positionResponseDTO);
		} else {
		    dto.setPosition(null);
		}
	}

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

    @PatchMapping("/{profileId}/status")
    public ResponseEntity<ApiResponse<ProfileDetailResponseDTO>> updateStatusOfProfile(
	    @PathVariable String profileId,
	    @RequestBody @Valid ProfileUpdateStatusForm form) {


	Profile updatedProfile = profileService.updateStatusOfProfile(profileId, form.getStatus());
	ProfileDetailResponseDTO responseDTO = modelMapper.map(updatedProfile, ProfileDetailResponseDTO.class);

	return ResponseEntity.ok(
		new ApiResponse<>(200, "Cập nhật profile thành công", responseDTO)
	);
    }

    @PatchMapping("/{profileId}/position")
    public ResponseEntity<ApiResponse<ProfileDetailResponseDTO>> updateProfilePosition(
	    @PathVariable String profileId,
	    @RequestBody @Valid ProfilePositionCreateForm form) {

	// 🔹 Gọi service để cập nhật vị trí
	ProfilePosition profilePosition = profilePositionService.createProfilePosition(profileId, form);

	// 🔹 Convert sang DTO trả về
	ProfileDetailResponseDTO responseDTO = modelMapper.map(profilePosition.getProfile(), ProfileDetailResponseDTO.class);

	return ResponseEntity.ok(
		new ApiResponse<>(200, "Cập nhật chức vụ thành công", responseDTO)
	);
    }

    @DeleteMapping("/{profileId}")
    public ResponseEntity<ApiResponse<ProfileDetailResponseDTO>> deleteProfile(
	    @PathVariable String profileId) {

	// 🔹 Gọi service để cập nhật vị trí
	Profile profile = profileService.deleteProfile(profileId);

	// 🔹 Convert sang DTO trả về
	ProfileDetailResponseDTO responseDTO = modelMapper.map(profile, ProfileDetailResponseDTO.class);

	return ResponseEntity.ok(
		new ApiResponse<>(200, "Xóa profile thành công", responseDTO)
	);
    }


}
