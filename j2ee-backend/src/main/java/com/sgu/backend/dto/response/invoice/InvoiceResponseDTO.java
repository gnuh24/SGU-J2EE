package com.sgu.backend.dto.response.invoice;

import com.sgu.backend.dto.response.ticket.TicketResponseDTO;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data

public class InvoiceResponseDTO {
    private String id;
    private String profileId;
    private String profileFullname;
		 private String profilePhone;

    private String createdAt;
    private Double totalAmount;

}
