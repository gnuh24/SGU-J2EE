package com.sgu.backend.dto.response.statistics;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ScheduleStatisticDTO {
    private String scheduleId;
    private String routeName;
    private LocalDateTime startTime;
    private long totalTickets;
    private long totalInvoices;
    private double totalRevenue;
}
