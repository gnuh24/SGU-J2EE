package com.sgu.backend.dto.request.invoice;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class InvoiceCreateForm {
    @NotNull
    private String accountId;

    @NotNull
    private Double totalAmount;
}
