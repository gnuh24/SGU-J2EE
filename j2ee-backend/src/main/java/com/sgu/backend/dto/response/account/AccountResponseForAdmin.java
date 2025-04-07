package com.sgu.backend.dto.response.account;


import com.sgu.backend.entities.Account;
import lombok.Data;

@Data
public class AccountResponseForAdmin {

    private String id;

    private String email;

    private String createdAt;

    private Account.Status status;

    private Account.Role role;

}
