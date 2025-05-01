package com.sgu.backend.services.impl;

import com.sgu.backend.dto.response.statistics.*;
import com.sgu.backend.repositories.AccountRepository;
import com.sgu.backend.repositories.InvoiceRepository;
import com.sgu.backend.repositories.ProfileRepository;
import com.sgu.backend.repositories.TicketRepository;
import com.sgu.backend.services.StatisticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StatisticsServiceImpl implements StatisticsService {

    private final ProfileRepository profileRepository;
    private final InvoiceRepository invoiceRepository;
    private final TicketRepository ticketRepository;
    private  final AccountRepository accountRepository;

    private LocalDateTime getStartDate(int year, int month) {
        return LocalDate.of(year, month, 1).atStartOfDay();
    }

    private LocalDateTime getEndDate(LocalDateTime start) {
        return start.plusMonths(1);
    }

    @Override
    public long countNewUsers(int year, int month) {
        LocalDateTime start = getStartDate(year, month);
        return accountRepository.countByCreatedAtBetween(start, getEndDate(start));
    }

    @Override
    public long countInvoices(int year, int month) {
        LocalDateTime start = getStartDate(year, month);
        return invoiceRepository.countByCreatedAtBetween(start, getEndDate(start));
    }

    @Override
    public long countTickets(int year, int month) {
        LocalDateTime start = getStartDate(year, month);
        LocalDateTime end = getEndDate(start);
        Long result = invoiceRepository.countTicketsSoldByMonth(start, end);
        return result != null ? result : 0;
    }


    @Override
    public double calculateRevenue(int year, int month) {
        LocalDateTime start = getStartDate(year, month);
        Double revenue = invoiceRepository.sumTotalAmountByCreatedAtBetween(start, getEndDate(start));
        return revenue != null ? revenue : 0.0;
    }
    public List<ScheduleStatisticDTO> getTopSchedules(LocalDate start, LocalDate end) {
        List<ScheduleStatisticsProjection> projections = invoiceRepository.getTopSchedules(
                start.atStartOfDay(), end.plusDays(1).atStartOfDay()
        );

        return projections.stream()
                .map(p -> new ScheduleStatisticDTO(
                        p.getScheduleId(),
                        p.getRouteName(),
                        p.getStartTime(),
                        p.getTotalTickets(),
                        p.getTotalInvoices(),
                        p.getTotalRevenue()
                ))
                .toList();
    }
    @Override
    public List<DailyRevenueDTO> getDailyRevenue(LocalDate startDate, LocalDate endDate) {
        LocalDateTime startDateTime = startDate.atStartOfDay();
        LocalDateTime endDateTime = endDate.plusDays(1).atStartOfDay().minusSeconds(1);

        List<DailyRevenueProjection> projections = invoiceRepository.getDailyRevenueBetween(startDateTime, endDateTime);

        return projections.stream()
                .map(p -> new DailyRevenueDTO(
                        p.getDate(),
                        p.getTotalRevenue(),
                        p.getTotalInvoices()
                ))
                .toList();
    }
    @Override
    public MonthlySummaryDTO getMonthlySummary(int year, int month) {
        LocalDateTime start = getStartDate(year, month);
        LocalDateTime end = getEndDate(start);

        long newUsers = accountRepository.countByCreatedAtBetween(start, end);
        long invoices = invoiceRepository.countByCreatedAtBetween(start, end);
        long tickets = Optional.ofNullable(invoiceRepository.countTicketsSoldByMonth(start, end)).orElse(0L);
        double revenue = Optional.ofNullable(invoiceRepository.sumTotalAmountByCreatedAtBetween(start, end)).orElse(0.0);

        return new MonthlySummaryDTO(newUsers, invoices, tickets, revenue);
    }



}
