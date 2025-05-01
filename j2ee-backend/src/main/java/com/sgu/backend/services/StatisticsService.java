package com.sgu.backend.services;

import com.sgu.backend.dto.response.statistics.DailyRevenueDTO;
import com.sgu.backend.dto.response.statistics.ScheduleStatisticDTO;

import java.time.LocalDate;
import java.util.List;

public interface StatisticsService {
    long countNewUsers(int year, int month);
    long countInvoices(int year, int month);
    long countTickets(int year, int month);
    double calculateRevenue(int year, int month);
    List<ScheduleStatisticDTO> getTopSchedules(LocalDate start, LocalDate end);
    List<DailyRevenueDTO> getDailyRevenue(LocalDate startDate, LocalDate endDate);
}
