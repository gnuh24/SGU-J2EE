package com.sgu.backend.entities;

import com.sgu.backend.utils.IdGenerator;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Invoice {
		
		@Id
		private String id = IdGenerator.generateId();
		
		@Column(unique = true, length = 50)
		private String transactionId;
		
		@Column(columnDefinition = "TEXT")
		private String paymentNote;
		
		private LocalDateTime  paymentTime;
		
		@ManyToOne
		@JoinColumn(name = "profileId", nullable = false)
		private Profile profile;
		
		@Column(nullable = false)
		@CreationTimestamp
		private LocalDateTime createdAt;
		
		@Column(nullable = false)
		private Double totalAmount;
		
		@Enumerated(EnumType.STRING)
		@Column(nullable = false)
		private PaymentMethod paymentMethod;
		
		@Enumerated(EnumType.STRING)
		@Column(nullable = false)
		private PaymentStatus paymentStatus = PaymentStatus.PENDING;
		
		@OneToMany(mappedBy = "invoice", cascade = CascadeType.ALL)
		private List<Ticket> tickets;
		
		public enum PaymentMethod {
				CASH,
				VNPAY
		}
		
		public enum PaymentStatus {
				PENDING,
				PAID,
				COMPLETE,
				FAILED,
				CANCELLED,
				EXPIRED,
				REFUNDED,
				DISPUTED,
				PROCESSING
		}
}
