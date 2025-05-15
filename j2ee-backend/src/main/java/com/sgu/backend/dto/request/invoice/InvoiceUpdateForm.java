package com.sgu.backend.dto.request.invoice;

import com.sgu.backend.entities.Invoice;
import jakarta.persistence.Column;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class InvoiceUpdateForm {
		
		private Invoice.PaymentStatus paymentStatus;
		
		private String transactionId;
		
		private String paymentNote;
		
		private String paymentTime;
		
}

