package com.sgu.user.services;

import com.sgu.user.dto.request.profile.ProfilePositionCreateForm;
import com.sgu.user.entities.Profile;
import com.sgu.user.entities.ProfilePosition;

import java.util.List;

public interface ProfilePositionService {

    // 🔹 Lấy tất cả các vị trí mà nhân viên từng giữ
    List<ProfilePosition> getPositionByProfileId(String profileId);

    // 🔹 Lấy vị trí hiện tại của nhân viên (Vẫn đang hiệu lực)
    ProfilePosition getCurrentProfilePosition(String profileId);

    ProfilePosition createProfilePosition(Profile profile, ProfilePositionCreateForm form);
    ProfilePosition createProfilePosition(String profileId, ProfilePositionCreateForm form);


}
