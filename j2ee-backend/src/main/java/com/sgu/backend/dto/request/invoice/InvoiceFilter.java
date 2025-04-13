package com.sgu.backend.dto.request.invoice;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class InvoiceFilter {
    private String accountId;
    private LocalDateTime fromDate;
    private LocalDateTime toDate;
    private Double minTotal;
    private Double maxTotal;
}
