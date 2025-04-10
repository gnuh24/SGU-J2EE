package com.sgu.backend.dto.request.coach;

import com.sgu.backend.dto.request.seat.SeatCreateForm;
import com.sgu.backend.entities.Coach;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class CoachCreateForm {
    @NotNull
    private Integer capacity;

    @NotBlank
    private String type; // VD: "Giường nằm", "Ghế ngồi"

    @NotBlank
    private String licensePlate;

    @NotNull
    private Coach.CoachStatus status;
    @NotEmpty
    private List<SeatCreateForm> seats;
}
