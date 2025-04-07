package com.sgu.backend.services;

import com.sgu.backend.dto.request.profile.ProfileCreateForm;
import com.sgu.backend.dto.request.profile.ProfileFilterForm;
import com.sgu.backend.dto.request.profile.ProfileUpdateForm;
import com.sgu.backend.entities.Profile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProfileService {
    Profile getProfileById(String profileId);
    Page<Profile> getAllProfile(Pageable pageable, String search, ProfileFilterForm form);
    Profile createProfile(ProfileCreateForm form);
    Profile updatePersionalInformationOfProfile(Profile profile, ProfileUpdateForm form);
    Profile updateStatusOfProfile(String profileId, Profile.Status status);
    Profile deleteProfile(String profileId);

}
