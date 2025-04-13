package com.sgu.backend.dto.request.ticket;

import com.sgu.backend.entities.Ticket;
import lombok.Data;

@Data
public class TicketFilter {
    private String scheduleId;
    private String seatId;
    private String invoiceId;
    private Ticket.TicketStatus status;
}

