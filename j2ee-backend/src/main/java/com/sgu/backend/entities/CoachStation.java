package com.sgu.backend.entities;

import com.sgu.backend.utils.IdGenerator;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import static com.sgu.backend.entities.CoachStation.Status.ACTIVE;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CoachStation {
    @Id
    @Column(length = 10)
    private String id = IdGenerator.generateId();

    @Column(nullable = false, length = 255)
    private String name;

    @Column(nullable = false, length = 255)
    private String address;

    @ManyToOne
    @JoinColumn(name = "cityId", nullable = false)
    private City city;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();

    @Column(nullable = false, precision = 10, scale = 6)
    private BigDecimal longitude;

    @Column(nullable = false, precision = 10, scale = 6)
    private BigDecimal latitude;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private Status status = ACTIVE;

    public enum Status {
	ACTIVE, INACTIVE, SUSPENDED
    }
}
