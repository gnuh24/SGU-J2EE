package com.sgu.user.dto.response.account;


import com.sgu.user.entities.Account;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
public class AccountResponseForAdmin {

    private String id;

    private String email;

    private String createdAt;

    private Account.Status status;

    private Account.Role role;

}
