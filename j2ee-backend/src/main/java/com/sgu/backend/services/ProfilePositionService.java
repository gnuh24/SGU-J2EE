package com.sgu.backend.services;

import com.sgu.backend.dto.request.profile.ProfilePositionCreateForm;
import com.sgu.backend.entities.Profile;
import com.sgu.backend.entities.ProfilePosition;

import java.util.List;

public interface ProfilePositionService {

    // 🔹 Lấy tất cả các vị trí mà nhân viên từng giữ
    List<ProfilePosition> getPositionByProfileId(String profileId);

    // 🔹 Lấy vị trí hiện tại của nhân viên (Vẫn đang hiệu lực)
    ProfilePosition getCurrentProfilePosition(String profileId);

    ProfilePosition createProfilePosition(Profile profile, ProfilePositionCreateForm form);
    ProfilePosition createProfilePosition(String profileId, ProfilePositionCreateForm form);


}
