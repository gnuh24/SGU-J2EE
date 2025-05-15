package com.sgu.backend.dto.request.invoice;

import com.sgu.backend.dto.request.ticket.TicketCreateForm;
import com.sgu.backend.entities.Invoice;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class InvoiceCreateForm {
		
		@NotNull(message = "profileId không được null")
		private String profileId;
		
		@NotNull(message = "totalAmount không được null")
		private Double totalAmount;

		@NotNull(message = "paymentMethod không được null")
		private Invoice.PaymentMethod paymentMethod; // Nên dùng Enum nếu có
		
//		@NotNull(message = "paymentStatus không được null")
//		private String paymentStatus; // Nên dùng Enum nếu có
		
		private List<TicketCreateForm> tickets;
}
