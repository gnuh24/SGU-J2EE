package com.sgu.backend.dto.request.invoice;

import com.sgu.backend.dto.request.ticket.TicketCreateForm;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class InvoiceCreateForm {

    private String profileId;

    @NotNull
    private Double totalAmount;
    private List<TicketCreateForm> tickets;
}
