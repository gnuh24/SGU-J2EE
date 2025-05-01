package com.sgu.backend.dto.response.statistics;

import java.math.BigDecimal;
import java.time.LocalDate;

public class DailyRevenueDTO {
    private LocalDate date;
    private BigDecimal totalRevenue;
    private Long totalInvoices;

    public DailyRevenueDTO(LocalDate date, BigDecimal totalRevenue, Long totalInvoices) {
        this.date = date;
        this.totalRevenue = totalRevenue;
        this.totalInvoices = totalInvoices;
    }

    // Getters và Setters
    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public BigDecimal getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(BigDecimal totalRevenue) {
        this.totalRevenue = totalRevenue;
    }

    public Long getTotalInvoices() {
        return totalInvoices;
    }

    public void setTotalInvoices(Long totalInvoices) {
        this.totalInvoices = totalInvoices;
    }
}
