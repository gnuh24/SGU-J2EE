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
public class Seat {

    @Id
    private String id = IdGenerator.generateId(); // Ví dụ: S001, S002...

    @Column(nullable = false)
    private Integer number; // Số ghế

    @ManyToOne
    @JoinColumn(name = "coachId", nullable = false)
    private Coach coach; // Khóa ngoại tham chiếu Coach

}
