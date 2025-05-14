package com.sgu.backend.dto.response.statistics;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ScheduleStatisticDTO {
		
		@Schema(description = "ID của lịch trình", example = "SCHEDULE123")
		private String scheduleId;
		
		@Schema(description = "Tên tuyến đường", example = "Hà Nội - TP. Hồ Chí Minh")
		private String routeName;
		
		@Schema(description = "Thời gian bắt đầu lịch trình", example = "2023-05-10T08:00:00")
		private LocalDateTime startTime;
		
		@Schema(description = "Tổng số vé đã bán", example = "120")
		private long totalTickets;
		
		@Schema(description = "Tổng số hóa đơn đã tạo", example = "100")
		private long totalInvoices;
		
		@Schema(description = "Tổng doanh thu từ lịch trình", example = "1000000")
		private double totalRevenue;
}
