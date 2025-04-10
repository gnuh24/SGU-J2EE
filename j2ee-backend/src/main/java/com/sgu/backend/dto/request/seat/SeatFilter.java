package com.sgu.backend.dto.request.seat;

import com.sgu.backend.entities.Seat;
import lombok.Data;

@Data
public class SeatFilter {
    private Seat.SeatType type;      // NORMAL, VIP
    private Boolean isNextToWindow;
    private Integer floor;
    private String coachId;
}
