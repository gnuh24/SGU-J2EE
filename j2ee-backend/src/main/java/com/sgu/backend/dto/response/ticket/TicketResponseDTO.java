package com.sgu.backend.dto.response.ticket;

import com.sgu.backend.entities.Ticket;
import lombok.Data;

@Data
public class TicketResponseDTO {
    private String id;
    private String scheduleId;
    private String seatId;
    private String invoiceId;
    private Double price;
    private Ticket.TicketStatus status;
}
