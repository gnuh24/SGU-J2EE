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
		 * Get the count of new users for a specific month and year.
		 *
		 * @param year the year to fetch statistics for
		 * @param month the month to fetch statistics for
		 * @return the count of new users in the specified month and year
		 */
		@Operation(summary = "Thống kê số lượng người dùng mới trong tháng",
				description = "Trả về số lượng người dùng mới đăng ký trong tháng cụ thể.")
		@GetMapping("/new-users")
		public ResponseEntity<ApiResponse<Long>> countNewUsers(@RequestParam int year, @RequestParam int month) {
				long count = statisticsService.countNewUsers(year, month);
				return ResponseEntity.ok(new ApiResponse<>(200, "Số lượng người dùng mới", count));
		}
		
		/**
		 * Get the count of invoices created for a specific month and year.
		 *
		 * @param year the year to fetch statistics for
		 * @param month the month to fetch statistics for
		 * @return the count of invoices in the specified month and year
		 */
		@Operation(summary = "Thống kê số lượng hóa đơn trong tháng",
				description = "Trả về số lượng hóa đơn được tạo trong tháng cụ thể.")
		@GetMapping("/invoices")
		public ResponseEntity<ApiResponse<Long>> countInvoices(@RequestParam int year, @RequestParam int month) {
				long count = statisticsService.countInvoices(year, month);
				return ResponseEntity.ok(new ApiResponse<>(200, "Số lượng hóa đơn", count));
		}
		
		/**
		 * Get the count of tickets booked for a specific month and year.
		 *
		 * @param year the year to fetch statistics for
		 * @param month the month to fetch statistics for
		 * @return the count of tickets booked in the specified month and year
		 */
		@Operation(summary = "Thống kê số lượng vé đặt trong tháng",
				description = "Trả về số lượng vé được đặt trong tháng cụ thể.")
		@GetMapping("/tickets")
		public ResponseEntity<ApiResponse<Long>> countTickets(@RequestParam int year, @RequestParam int month) {
				long count = statisticsService.countTickets(year, month);
				return ResponseEntity.ok(new ApiResponse<>(200, "Số lượng vé đặt", count));
		}
		
		/**
		 * Get the total revenue for a specific month and year.
		 *
		 * @param year the year to fetch statistics for
		 * @param month the month to fetch statistics for
		 * @return the total revenue in the specified month and year
		 */
		@Operation(summary = "Thống kê tổng doanh thu trong tháng",
				description = "Trả về tổng doanh thu trong tháng cụ thể.")
		@GetMapping("/revenue")
		public ResponseEntity<ApiResponse<Double>> totalRevenue(@RequestParam int year, @RequestParam int month) {
				double revenue = statisticsService.calculateRevenue(year, month);
				return ResponseEntity.ok(new ApiResponse<>(200, "Tổng doanh thu", revenue));
		}
		
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
