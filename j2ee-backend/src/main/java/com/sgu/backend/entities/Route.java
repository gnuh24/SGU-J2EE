package com.sgu.backend.entities;

import com.sgu.backend.utils.IdGenerator;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Route {

    @Id
    private String id = IdGenerator.generateId(); // Ví dụ: R001, R002...

    @Column(nullable = false)
    private Double distance;

    @Column(nullable = false)
    private Double duration;

    @Column(nullable = false)
    private BigDecimal price;

    @CreationTimestamp
    private LocalDateTime createdAt;
	
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RouteStatus status;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "departureStationId", nullable = false)
    private CoachStation departureStation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "arrivalStationId", nullable = false)
    private CoachStation arrivalStation;
    public enum RouteStatus {
        ACTIVE,
        INACTIVE,
        MAINTENANCE
    }
}
