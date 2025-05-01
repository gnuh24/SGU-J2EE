package com.sgu.backend.dto.response.statistics;

import java.math.BigDecimal;
import java.time.LocalDate;

public interface DailyRevenueProjection {
    LocalDate getDate();
    BigDecimal getTotalRevenue();
    Long getTotalInvoices();
}
