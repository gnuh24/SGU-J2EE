package com.sgu.backend.dto.request.account;

import com.sgu.backend.entities.Account;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AccountUpdateRoleForm {

    @NotNull(message = "Vai trò không được để trống")
    private Account.Role role;

}
