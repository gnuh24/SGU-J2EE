package com.sgu.backend.entities;

import com.sgu.backend.utils.IdGenerator;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Invoice {
		
		@Id
		private String id = IdGenerator.generateId();
		
		@ManyToOne
		@JoinColumn(name = "profileId", nullable = false)
		private Profile profile;
		
		@Column(nullable = false)
		private LocalDateTime createdAt;
		
		@Column(nullable = false)
		private Double totalAmount;
		
		@Enumerated(EnumType.STRING)
		@Column(nullable = false)
		private PaymentMethod paymentMethod;
		
		@Enumerated(EnumType.STRING)
		@Column(nullable = false)
		private PaymentStatus paymentStatus;
		
		@OneToMany(mappedBy = "invoice", cascade = CascadeType.ALL)
		private List<Ticket> tickets;
		
		public enum PaymentMethod {
				CASH,
				CREDIT_CARD,
				BANK_TRANSFER
		}
		
		public enum PaymentStatus {
				PENDING,
				PAID,
				CANCELLED
		}
}
