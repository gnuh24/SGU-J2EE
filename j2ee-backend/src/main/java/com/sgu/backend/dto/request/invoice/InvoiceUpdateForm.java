package com.sgu.backend.dto.request.invoice;

import lombok.Data;

@Data
public class InvoiceUpdateForm {
    private Double totalAmount;
    private String customerName;
    private String note;
}

