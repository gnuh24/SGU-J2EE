package com.sgu.backend.dto.request.profile;

import com.sgu.backend.entities.Profile;
import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class ProfileCreateForm {

    private String fullname;

    private String email;

    private String phone;

    private Boolean gender;

    private Date birthday;

    private Profile.Status status;



}
