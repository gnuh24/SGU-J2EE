package com.sgu.backend.controllers;

import com.sgu.backend.apiresponse.ApiResponse;
import com.sgu.backend.dto.response.statistics.DailyRevenueDTO;
import com.sgu.backend.dto.response.statistics.MonthlySummaryDTO;
import com.sgu.backend.dto.response.statistics.ScheduleStatisticDTO;
import com.sgu.backend.services.StatisticsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

/**
 * StatisticsController handles all statistical API requests related to user activity, revenue, and ticket bookings.
 * This includes monthly statistics, daily revenue, and top schedules.
 */
@RestController
@RequestMapping("/statistics")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@Tag(name = "Statistics API", description = "Thống kê hệ thống theo tháng")
public class StatisticsController {
		
		private final StatisticsService statisticsService;
		
		/**
		 * Get the top schedules used during a specific month and year.
		 *
		 * @param year the year to fetch statistics for
		 * @param month the month to fetch statistics for
		 * @return the list of top schedules used in the specified month and year
		 */
		@GetMapping("/top-schedules")
		public ResponseEntity<ApiResponse<List<ScheduleStatisticDTO>>> getTopSchedules(
				@RequestParam int year,
				@RequestParam int month) {
				LocalDate start = LocalDate.of(year, month, 1);
				LocalDate end = start.withDayOfMonth(start.lengthOfMonth());
				var result = statisticsService.getTopSchedules(start, end);
				return ResponseEntity.ok(new ApiResponse<>(200, "Top lịch trình được sử dụng nhiều nhất", result));
		}
		
		/**
		 * Get daily revenue statistics for a specific month and year.
		 *
		 * @param year the year to fetch statistics for
		 * @param month the month to fetch statistics for
		 * @return the list of daily revenue statistics for the specified month and year
		 */
		@GetMapping("/daily-revenue")
		public ResponseEntity<ApiResponse<List<DailyRevenueDTO>>> getDailyRevenue(
				@RequestParam int year,
				@RequestParam int month) {
				LocalDate start = LocalDate.of(year, month, 1);
				LocalDate end = start.withDayOfMonth(start.lengthOfMonth());
				List<DailyRevenueDTO> result = statisticsService.getDailyRevenue(start, end);
				
				return ResponseEntity.ok(new ApiResponse<>(200, "Thống kê doanh thu theo từng ngày", result));
		}
		
		/**
		 * Get a general summary of statistics (users, invoices, tickets, revenue) for a specific month and year.
		 *
		 * @param year the year to fetch statistics for
		 * @param month the month to fetch statistics for
		 * @return the general statistics summary for the specified month and year
		 */
		@Operation(summary = "Tổng hợp thống kê trong tháng (người dùng, hóa đơn, vé, doanh thu)",
				description = "Trả về thống kê tổng hợp của người dùng, hóa đơn, vé và doanh thu trong tháng.")
		@GetMapping("/general")
		public ResponseEntity<ApiResponse<MonthlySummaryDTO>> getMonthlySummary(
				@RequestParam int year,
				@RequestParam int month) {
				MonthlySummaryDTO summary = statisticsService.getMonthlySummary(year, month);
				return ResponseEntity.ok(new ApiResponse<>(200, "Tổng hợp thống kê trong tháng", summary));
		}
}
