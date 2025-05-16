package com.sgu.backend.dto.request.account;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AccountUpdateFormForResetPassword {
		
		private String otp;
		
		private String newPassword;
}
