package com.sgu.backend.dto.response.statistics;

import java.time.LocalDateTime;

public interface ScheduleStatisticsProjection {
    String getScheduleId();
    String getRouteName();
    LocalDateTime getStartTime();
    Long getTotalTickets();
    Long getTotalInvoices();
    Double getTotalRevenue();
}
