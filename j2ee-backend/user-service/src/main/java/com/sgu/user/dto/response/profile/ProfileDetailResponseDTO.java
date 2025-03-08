package com.sgu.user.dto.response.profile;

import com.sgu.user.dto.response.position.PositionResponseDTO;
import com.sgu.user.entities.Profile;
import com.sgu.user.entities.ProfilePosition;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProfileDetailResponseDTO {

    private String id;

    private String fullname;

    private String email;

    private String phone;

    private Boolean gender;

    private String birthday;

    private Profile.Status status;

    private Boolean isFingerprintVerified;

    private PositionResponseDTO position;

//    private List<ProfilePositionResponseDTO> profilePositions;


}
