package com.sgu.backend.dto.response.statistics;

public class MonthlySummaryDTO {
    private long newUsers;
    private long invoices;
    private long tickets;
    private double revenue;

    public MonthlySummaryDTO(long newUsers, long invoices, long tickets, double revenue) {
        this.newUsers = newUsers;
        this.invoices = invoices;
        this.tickets = tickets;
        this.revenue = revenue;
    }

    // Getters and Setters
}
