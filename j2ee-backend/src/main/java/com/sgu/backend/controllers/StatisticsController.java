package com.sgu.backend.controllers;



import com.sgu.backend.apiresponse.ApiResponse;
import com.sgu.backend.dto.response.statistics.DailyRevenueDTO;
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

@RestController
@RequestMapping("/statistics")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@Tag(name = "Statistics API", description = "Thống kê hệ thống theo tháng")
public class StatisticsController {

    private final StatisticsService statisticsService;

    @Operation(summary = "Thống kê số lượng người dùng mới trong tháng")
    @GetMapping("/new-users")
    public ResponseEntity<ApiResponse<Long>> countNewUsers(@RequestParam int year, @RequestParam int month) {
        long count = statisticsService.countNewUsers(year, month);
        return ResponseEntity.ok(new ApiResponse<>(200, "Số lượng người dùng mới", count));
    }

    @Operation(summary = "Thống kê số lượng hóa đơn trong tháng")
    @GetMapping("/invoices")
    public ResponseEntity<ApiResponse<Long>> countInvoices(@RequestParam int year, @RequestParam int month) {
        long count = statisticsService.countInvoices(year, month);
        return ResponseEntity.ok(new ApiResponse<>(200, "Số lượng hóa đơn", count));
    }

    @Operation(summary = "Thống kê số lượng vé đặt trong tháng")
    @GetMapping("/tickets")
    public ResponseEntity<ApiResponse<Long>> countTickets(@RequestParam int year, @RequestParam int month) {
        long count = statisticsService.countTickets(year, month);
        return ResponseEntity.ok(new ApiResponse<>(200, "Số lượng vé đặt", count));
    }

    @Operation(summary = "Thống kê tổng doanh thu trong tháng")
    @GetMapping("/revenue")
    public ResponseEntity<ApiResponse<Double>> totalRevenue(@RequestParam int year, @RequestParam int month) {
        double revenue = statisticsService.calculateRevenue(year, month);
        return ResponseEntity.ok(new ApiResponse<>(200, "Tổng doanh thu", revenue));
    }
    @GetMapping("/top-schedules")
    public ResponseEntity<ApiResponse<List<ScheduleStatisticDTO>>> getTopSchedules(
            @RequestParam int year,
            @RequestParam int month) {
        LocalDate start = LocalDate.of(year, month, 1);
        LocalDate end = start.withDayOfMonth(start.lengthOfMonth());
        var result = statisticsService.getTopSchedules(start, end);
        return ResponseEntity.ok(new ApiResponse<>(200, "Top lịch trình được sử dụng nhiều nhất", result));
    }
    @GetMapping("/daily-revenue")
    public ResponseEntity<ApiResponse<List<DailyRevenueDTO>>> getDailyRevenue(
            @RequestParam int year,
            @RequestParam int month) {

        LocalDate start = LocalDate.of(year, month, 1);
        LocalDate end = start.withDayOfMonth(start.lengthOfMonth());
        List<DailyRevenueDTO> result = statisticsService.getDailyRevenue(start, end);

        return ResponseEntity.ok(new ApiResponse<>(200, "Thống kê doanh thu theo từng ngày", result));
    }


}
