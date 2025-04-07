package com.sgu.backend.dto.request.profile;

import com.sgu.backend.entities.Profile;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProfileCreateForm {

    private String fullname;

    private String email;

    private String phone;

}
