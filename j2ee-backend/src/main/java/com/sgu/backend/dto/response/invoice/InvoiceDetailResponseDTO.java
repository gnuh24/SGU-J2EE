package com.sgu.backend.dto.response.invoice;

import com.sgu.backend.dto.response.ticket.TicketResponseDTO;
import com.sgu.backend.entities.Invoice;
import lombok.Data;

import java.util.List;

@Data
public class InvoiceDetailResponseDTO
{
		private String id;
		private String profileId;
		private String profileFullname;
		private String profilePhone;
		private Invoice.PaymentMethod paymentMethod;
		private Invoice.PaymentStatus paymentStatus;
		
		private String createdAt;
		private Double totalAmount;
		
		private List<TicketResponseDTO> tickets;
}
