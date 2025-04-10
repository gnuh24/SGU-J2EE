package com.sgu.backend.entities;

import com.sgu.backend.entities.Seat;
import com.sgu.backend.utils.IdGenerator;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Coach {

    @Id
    private String id = IdGenerator.generateId(); // Ví dụ: C001, C002...

    @Column(nullable = false)
    private Integer capacity;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @Column(nullable = false, length = 255)
    private String type; // Ví dụ: "Giường nằm", "Ghế ngồi"

    @Column(nullable = false, unique = true, length = 50)
    private String licensePlate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CoachStatus status;

    @OneToMany(mappedBy = "coach", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Seat> seats;

    public enum CoachStatus {
	ACTIVE,
	INACTIVE,
	MAINTENANCE
    }
}
