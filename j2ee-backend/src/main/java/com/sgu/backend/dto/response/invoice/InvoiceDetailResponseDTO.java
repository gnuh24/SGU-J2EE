package com.sgu.backend.dto.response.invoice;

import com.sgu.backend.dto.response.ticket.TicketResponseDTO;
import com.sgu.backend.entities.Invoice;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class InvoiceDetailResponseDTO {
		
		@Schema(description = "ID của hóa đơn", example = "INVOICE12345")
		private String id;
		
		@Schema(description = "ID của profile khách hàng", example = "PROFILE12345")
		private String profileId;
		
		@Schema(description = "Tên đầy đủ của khách hàng", example = "Nguyễn Văn A")
		private String profileFullname;
		
		@Schema(description = "Số điện thoại của khách hàng", example = "0912345678")
		private String profilePhone;
		
		@Schema(description = "Phương thức thanh toán", example = "CREDIT_CARD")
		private Invoice.PaymentMethod paymentMethod;
		
		private String transactionId;
		
		private String paymentNote;
		
		private String paymentTime;
		
		@Schema(description = "Trạng thái thanh toán", example = "PAID")
		private Invoice.PaymentStatus paymentStatus;
		
		@Schema(description = "Thời gian tạo hóa đơn", example = "2023-05-10T12:00:00")
		private String createdAt;
		
		@Schema(description = "Tổng số tiền của hóa đơn", example = "500000")
		private Double totalAmount;
		
		@Schema(description = "Danh sách vé trong hóa đơn")
		private List<TicketResponseDTO> tickets;
}
