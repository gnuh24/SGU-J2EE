package com.sgu.backend.dto.request.ticket;

import com.sgu.backend.entities.Ticket;
import lombok.Data;

@Data
public class TicketUpdateForm {
    private String scheduleId;
    private String seatId;
    private String invoiceId;
    private Double price;
    private Ticket.TicketStatus status;
}
