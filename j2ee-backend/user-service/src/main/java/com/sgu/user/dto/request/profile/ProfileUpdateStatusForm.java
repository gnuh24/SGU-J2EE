package com.sgu.user.dto.request.profile;

import com.sgu.user.entities.Profile;
import lombok.Data;

@Data
public class ProfileUpdateStatusForm {

    private Profile.Status status;

}
