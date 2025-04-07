package com.sgu.backend.entities;

import com.sgu.backend.utils.IdGenerator;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Position {

    @Id
    @Column(length = 10)
    private String id = IdGenerator.generateId();

    @Column(nullable = false, unique = true, length = 255)
    private String name;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal baseSalary;

    @OneToMany(mappedBy = "position", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProfilePosition> profilePositions;
}
