package com.sgu.backend.dto.response.statistics;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DailyRevenueDTO {
		
		@Schema(description = "Ngày thống kê doanh thu", example = "2023-05-10")
		private LocalDate date;
		
		@Schema(description = "Tổng doanh thu của ngày", example = "5000000")
		private BigDecimal totalRevenue;
		
		@Schema(description = "Tổng số hóa đơn trong ngày", example = "150")
		private Long totalInvoices;
		
}
