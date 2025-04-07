package com.sgu.backend.dto.request.profile;

import com.sgu.backend.entities.Profile;
import lombok.Data;

@Data
public class ProfileUpdateStatusForm {

    private Profile.Status status;

}
