package com.sgu.user.dto.request.profile;

import com.sgu.user.entities.Profile;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProfileUpdateForm {

    private String fullname;

    private String phone;

    private Boolean gender;

    private Date birthday;

}

