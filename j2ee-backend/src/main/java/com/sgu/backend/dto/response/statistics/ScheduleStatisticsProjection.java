package com.sgu.backend.dto.response.statistics;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;

public interface ScheduleStatisticsProjection {
		
		@Schema(description = "ID của lịch trình", example = "SCHEDULE123")
		String getScheduleId();
		
		@Schema(description = "Tên tuyến đường", example = "Hà Nội - TP. Hồ Chí Minh")
		String getRouteName();
		
		@Schema(description = "Thời gian bắt đầu lịch trình", example = "2023-05-10T08:00:00")
		LocalDateTime getStartTime();
		
		@Schema(description = "Tổng số vé bán được", example = "120")
		Long getTotalTickets();
		
		@Schema(description = "Tổng số hóa đơn", example = "100")
		Long getTotalInvoices();
		
		@Schema(description = "Tổng doanh thu", example = "1000000")
		Double getTotalRevenue();
}
