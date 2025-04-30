package com.sgu.backend.dto.response.coach;

import com.sgu.backend.dto.response.seat.SeatResponseDTO;
import com.sgu.backend.entities.Coach;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class CoachResponseDTO {
    private String id;
    private String licensePlate;
    private String type;
    private Integer capacity;
    private Coach.CoachStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<SeatResponseDTO> seatResponseDTO;
}
