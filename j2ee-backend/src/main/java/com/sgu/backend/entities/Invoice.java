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
    private LocalDateTime issuedAt;

    @Column(nullable = false)
    private Double totalAmount;

    @OneToMany(mappedBy = "invoice", cascade = CascadeType.ALL)
    private List<Ticket> tickets;
}
