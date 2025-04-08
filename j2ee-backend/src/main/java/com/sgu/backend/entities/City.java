package com.sgu.backend.entities;

import com.sgu.backend.utils.IdGenerator;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

import static com.sgu.backend.entities.City.Status.ACTIVE;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class City {

    @Id
    @Column(length = 10)
    private String id = IdGenerator.generateId();

    @Column(nullable = false, length = 255)
    private String name;

    @Column(nullable = false, updatable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;

    @Column(nullable = false)
    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private Status status = ACTIVE;

    @OneToMany(mappedBy = "city", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CoachStation> coachStations;

    public enum Status {
	ACTIVE, INACTIVE
    }
}

