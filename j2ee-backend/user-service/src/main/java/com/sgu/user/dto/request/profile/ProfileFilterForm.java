package com.sgu.user.dto.request.profile;

import com.sgu.user.entities.Account;
import lombok.Data;

@Data
public class ProfileFilterForm {

    private Account.Status status;

}