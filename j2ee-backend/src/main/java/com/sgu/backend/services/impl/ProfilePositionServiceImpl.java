package com.sgu.backend.services.impl;

import com.sgu.backend.dto.request.profile.ProfilePositionCreateForm;
import com.sgu.backend.entities.Position;
import com.sgu.backend.entities.ProfilePosition;
import com.sgu.backend.entities.Profile;

import com.sgu.backend.repositories.ProfilePositionRepository;
import com.sgu.backend.services.PositionService;
import com.sgu.backend.services.ProfilePositionService;
import com.sgu.backend.services.ProfileService;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfilePositionServiceImpl implements ProfilePositionService {

    @Autowired
    private ProfilePositionRepository profilePositionRepository;

    @Autowired
    private PositionService positionService;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private ProfileService profileService;
    /**
     * 📌 Lấy danh sách tất cả các vị trí mà nhân viên đã từng giữ
     */
    @Override
    public List<ProfilePosition> getPositionByProfileId(String profileId) {
	List<ProfilePosition> positions = profilePositionRepository.findByIdProfileId(profileId);

	if (positions.isEmpty()) {
	    throw new EntityNotFoundException("Không tìm thấy bất kỳ vị trí nào cho nhân viên có ID: " + profileId);
	}

	return positions;
    }

    /**
     * 📌 Lấy vị trí hiện tại của nhân viên (Đang có hiệu lực)
     */
    @Override
    public ProfilePosition getCurrentProfilePosition(String profileId) {
	return profilePositionRepository.findLatestByProfileId(profileId).orElse(null);
    }

    @Override
    public ProfilePosition createProfilePosition(Profile profile, ProfilePositionCreateForm form) {
	ProfilePosition profilePosition = modelMapper.map(form, ProfilePosition.class);
	profilePosition.getId().setStartDate(form.getStartDate());

	profilePosition.setEndDate(form.getEndDate());

	if (form.getEndDate() != null){
	    profilePosition.setEndDate(form.getEndDate());
	}

	Position position = positionService.getPositionById(form.getPositionId());
	profilePosition.setPosition(position);

	profilePosition.setProfile(profile);

	return profilePositionRepository.save(profilePosition);
    }

    @Override
    public ProfilePosition createProfilePosition(String profileId, ProfilePositionCreateForm form) {


	ProfilePosition profilePosition = modelMapper.map(form, ProfilePosition.class);
	profilePosition.getId().setStartDate(form.getStartDate());

	profilePosition.setEndDate(form.getEndDate());

	if (form.getEndDate() != null){
	    profilePosition.setEndDate(form.getEndDate());
	}

	Position position = positionService.getPositionById(form.getPositionId());
	profilePosition.setPosition(position);

	Profile profile = profileService.getProfileById(profileId);
	profilePosition.setProfile(profile);

	return profilePositionRepository.save(profilePosition);
    }

}
