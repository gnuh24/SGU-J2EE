package com.sgu.backend.dto.response.profile;

import com.sgu.backend.dto.response.position.PositionResponseDTO;
import com.sgu.backend.entities.Profile;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
