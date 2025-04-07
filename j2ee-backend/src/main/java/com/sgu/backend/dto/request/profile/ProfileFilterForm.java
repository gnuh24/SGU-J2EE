package com.sgu.backend.dto.request.profile;

import com.sgu.backend.entities.Account;
import lombok.Data;

@Data
public class ProfileFilterForm {

    private Account.Status status;

}