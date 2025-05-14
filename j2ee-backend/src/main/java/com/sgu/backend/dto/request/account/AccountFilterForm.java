package com.sgu.backend.dto.request.account;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AccountFilterForm {
		
		@Schema(description = "Ngày bắt đầu lọc tài khoản", example = "2023-01-01", type = "string", format = "date")
		@DateTimeFormat(pattern = "yyyy-MM-dd")
		private Date from;
		
		@Schema(description = "Ngày kết thúc lọc tài khoản", example = "2023-12-31", type = "string", format = "date")
		@DateTimeFormat(pattern = "yyyy-MM-dd")
		private Date to;
		
		@Schema(description = "Từ khóa tìm kiếm trong tài khoản (ví dụ: tên tài khoản hoặc email)", example = "admin", type = "string")
		private String search;
		
		@Schema(description = "Vai trò của tài khoản (ví dụ: ADMIN, USER)", example = "ADMIN", type = "string")
		private String role;
		
		@Schema(description = "Trạng thái của tài khoản (ví dụ: active, suspended)", example = "active", type = "string")
		private String status;
		
}
