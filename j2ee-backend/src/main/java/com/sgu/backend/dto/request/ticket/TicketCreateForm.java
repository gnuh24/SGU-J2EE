package com.sgu.backend.dto.request.ticket;

import com.sgu.backend.entities.Invoice;
import com.sgu.backend.entities.Ticket;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class TicketCreateForm {
    @NotNull
    private String scheduleId;

    @NotNull
    private String seatId;

    private Invoice invoice; // optional khi tạo

    @NotNull
    private Double price;

    @NotNull
    private Ticket.TicketStatus status;
}
