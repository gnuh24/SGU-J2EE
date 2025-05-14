package com.sgu.backend.entities;

import com.sgu.backend.utils.IdGenerator;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Schedule {

    @Id
    private String id = IdGenerator.generateId(); // Ví dụ: SC001

    @ManyToOne
    @JoinColumn(name = "routeId", nullable = false)
    private Route route;
		
		@ManyToOne
		@JoinColumn(name = "coachId", nullable = false)
		private Coach coach;
		
		@OneToMany(mappedBy = "schedule")
		private List<Ticket> tickets;

    @Column(nullable = false)
    private LocalTime arrivalTime;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime updatedAt;

    public enum Status {
        ACTIVE,
        INACTIVE,
			CANCELLED
    }
}
