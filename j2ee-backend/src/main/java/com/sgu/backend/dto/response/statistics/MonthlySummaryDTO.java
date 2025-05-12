package com.sgu.backend.dto.response.statistics;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MonthlySummaryDTO {
		
		@Schema(description = "Số lượng người dùng mới trong tháng", example = "150")
		private long newUsers;
		
		@Schema(description = "Số lượng hóa đơn trong tháng", example = "200")
		private long invoices;
		
		@Schema(description = "Số lượng vé đã bán trong tháng", example = "350")
		private long tickets;
		
		@Schema(description = "Doanh thu trong tháng", example = "5000000")
		private double revenue;
		
}
