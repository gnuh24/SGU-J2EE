package com.sgu.backend.dto.request.ticket;

import com.sgu.backend.entities.Ticket;
import lombok.Data;

@Data
public class TicketFilter {
		private String search;
    private Ticket.TicketStatus status;
}

