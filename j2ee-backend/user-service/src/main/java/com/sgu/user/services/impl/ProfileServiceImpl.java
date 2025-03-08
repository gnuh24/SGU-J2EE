package com.sgu.user.services.impl;

import com.sgu.user.dto.request.profile.ProfileCreateForm;
import com.sgu.user.dto.request.profile.ProfileFilterForm;
import com.sgu.user.dto.request.profile.ProfileUpdateForm;
import com.sgu.user.entities.Account;
import com.sgu.user.entities.Profile;
import com.sgu.user.entities.ProfilePosition;
import com.sgu.user.repositories.ProfileRepository;
import com.sgu.user.services.AccountService;
import com.sgu.user.services.ProfilePositionService;
import com.sgu.user.services.ProfileService;
import com.sgu.user.specifications.ProfileSpecification;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProfileServiceImpl implements ProfileService {

    @Autowired
    private ProfileRepository profileRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    @Lazy
    private ProfilePositionService profilePositionService;

    @Autowired
    @Lazy
    private AccountService accountService;

    @Override
    public Page<Profile> getAllProfile(Pageable pageable, String search, ProfileFilterForm form) {
	Specification<Profile> specification = ProfileSpecification.buildWhere(search, form);
	return profileRepository.findAll(specification, pageable);
    }

    @Override
    public Profile getProfileById(String profileId) {
	return profileRepository.findById(profileId)
		.orElseThrow(() -> new EntityNotFoundException("Không tìm thấy profile với ID: " + profileId));
    }


    @Override
    @Transactional
    public Profile createProfile(ProfileCreateForm form) {

	Profile profile = modelMapper.map(form, Profile.class);
	profile = profileRepository.save(profile);

	ProfilePosition profilePosition = profilePositionService.createProfilePosition(profile, form.getProfilePositionCreateForm());

	Account account = accountService.createAccount(form.getEmail(), form.getBirthday(), profilePosition);

	return profile;
    }

    @Override
    public Profile updatePersionalInformationOfProfile(Profile profile,  ProfileUpdateForm form) {

	// Kiểm tra từng trường, nếu không null thì mới cập nhật
	if (form.getFullname() != null) {
	    profile.setFullname(form.getFullname());
	}
	if (form.getPhone() != null) {
	    profile.setPhone(form.getPhone());
	}
	if (form.getGender() != null) {
	    profile.setGender(form.getGender());
	}
	if (form.getBirthday() != null) {
	    profile.setBirthday(form.getBirthday());
	}

	// Lưu lại vào database
	return profileRepository.save(profile);
    }

    @Override
    public Profile updateStatusOfProfile(String profileId, Profile.Status status) {
	// Tìm profile theo ID
	Profile profile = getProfileById(profileId);

	// Cập nhật trạng thái
	profile.setStatus(status);

	// Lưu vào database
	return profileRepository.save(profile);
    }

    @Override
    public Profile deleteProfile(String profileId) {
	return updateStatusOfProfile(profileId, Profile.Status.DELETED);
    }


}
