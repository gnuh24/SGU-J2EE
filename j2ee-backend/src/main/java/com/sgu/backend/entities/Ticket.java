package com.sgu.backend.entities;

import com.sgu.backend.utils.IdGenerator;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

import static java.time.LocalTime.now;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Ticket {
    @Id
    private String id = IdGenerator.generateId();
		
		@Column(nullable = false)
		private Double price;
		
		@Column(nullable = false)
		private LocalDateTime createdAt = LocalDateTime.now();
		
		@Enumerated(EnumType.STRING)
		@Column(nullable = false)
		private TicketStatus status = TicketStatus.BOOKED;

    @ManyToOne
    @JoinColumn(name = "scheduleId", nullable = false)
    private Schedule schedule;

    @ManyToOne
    @JoinColumn(name = "seatId", nullable = false)
    private Seat seat;

    @ManyToOne
    @JoinColumn(name = "invoiceId")
    private Invoice invoice;

    public enum TicketStatus {
        BOOKED, CANCELLED, USED
    }
	

		
}
