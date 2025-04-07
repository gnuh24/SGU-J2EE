package com.sgu.backend.dto.request.account;

import com.sgu.backend.entities.Account;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AccountUpdateStatusForm {

    @NotNull(message = "Trạng thái không được để trống")
    private Account.Status status;

}
