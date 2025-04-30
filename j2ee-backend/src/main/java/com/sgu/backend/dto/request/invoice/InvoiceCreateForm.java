package com.sgu.backend.dto.request.invoice;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class InvoiceCreateForm {
    @NotNull
    private String profileId;

    @NotNull
    private Double totalAmount;
}
