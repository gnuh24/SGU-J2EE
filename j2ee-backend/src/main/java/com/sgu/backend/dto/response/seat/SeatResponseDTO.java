package com.sgu.backend.dto.response.seat;

import com.sgu.backend.entities.Seat;
import lombok.Data;

@Data
public class SeatResponseDTO {
    private String id;
    private Integer number;
    private Seat.SeatType type;
    private Boolean isNextToWindow;
    private Integer floor;
    private String coachId;
    private String coachLicensePlate; // bổ sung nếu muốn hiển thị thông tin coach
}
