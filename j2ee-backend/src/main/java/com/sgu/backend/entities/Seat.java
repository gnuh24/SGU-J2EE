package com.sgu.backend.entities;

import com.sgu.backend.repositories.Coach;
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

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SeatType type; // NORMAL, VIP

    @Column(nullable = false)
    private Boolean isNextToWindow; // Ghế gần cửa sổ

    @Column(nullable = false)
    private Integer floor; // Tầng 1 hoặc 2

    @ManyToOne
    @JoinColumn(name = "coachId", nullable = false)
    private Coach coach; // Khóa ngoại tham chiếu Coach

    public enum SeatType {
	NORMAL,
	VIP
    }
}
