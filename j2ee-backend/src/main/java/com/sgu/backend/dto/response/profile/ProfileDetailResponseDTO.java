package com.sgu.backend.dto.response.profile;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProfileDetailResponseDTO {
		
		@Schema(description = "ID của profile", example = "PROFILE12345")
		private String id;
		
		@Schema(description = "Họ và tên của người dùng", example = "Nguyễn Văn A")
		private String fullname;
		
		@Schema(description = "Email của người dùng", example = "nguyen@gmail.com")
		private String email;
		
		@Schema(description = "Số điện thoại của người dùng", example = "0912345678")
		private String phone;
}
