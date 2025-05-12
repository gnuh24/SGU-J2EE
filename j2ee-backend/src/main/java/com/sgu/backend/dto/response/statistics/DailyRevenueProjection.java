package com.sgu.backend.dto.response.statistics;

import io.swagger.v3.oas.annotations.media.Schema;

import java.math.BigDecimal;
import java.time.LocalDate;

public interface DailyRevenueProjection {
		
		@Schema(description = "Ngày thống kê doanh thu", example = "2023-05-10")
		LocalDate getDate();
		
		@Schema(description = "Tổng doanh thu của ngày", example = "5000000")
		BigDecimal getTotalRevenue();
		
		@Schema(description = "Tổng số hóa đơn trong ngày", example = "150")
		Long getTotalInvoices();
}
