package com.sgu.backend.entities;

import com.sgu.backend.utils.IdGenerator;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Ticket {
    @Id
    private String id = IdGenerator.generateId();

    @ManyToOne
    @JoinColumn(name = "scheduleId", nullable = false)
    private Schedule schedule;

    @ManyToOne
    @JoinColumn(name = "seatId", nullable = false)
    private Seat seat;

    @ManyToOne
    @JoinColumn(name = "invoiceId")
    private Invoice invoice;

    @Column(nullable = false)
    private Double price;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TicketStatus status;

    public enum TicketStatus {
        BOOKED, CANCELED, USED
    }
}
