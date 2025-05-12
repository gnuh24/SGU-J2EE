package com.sgu.backend.dto.response.account;

import com.sgu.backend.entities.Account;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class AccountResponseForAdmin {
		
		@Schema(description = "Mã ID của tài khoản", example = "12345")
		private String id;
		
		@Schema(description = "Email của tài khoản", example = "admin@example.com")
		private String email;
		
		@Schema(description = "Ngày tạo tài khoản", example = "2023-05-10T12:30:00")
		private String createdAt;
		
		@Schema(description = "Trạng thái của tài khoản", example = "ACTIVE")
		private Account.Status status;
		
		@Schema(description = "Vai trò của tài khoản", example = "ADMIN")
		private Account.Role role;
}
