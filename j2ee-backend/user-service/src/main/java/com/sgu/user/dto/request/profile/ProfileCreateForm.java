package com.sgu.user.dto.request.profile;

import com.sgu.user.entities.Profile;
import jakarta.persistence.Column;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;

import java.util.Date;

@Data
public class ProfileCreateForm {

    private String fullname;

    private String email;

    private String phone;

    private Boolean gender;

    private Date birthday;

    private Profile.Status status;

    private ProfilePositionCreateForm profilePositionCreateForm;

}
